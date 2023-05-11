using Conference.Database;
using Conference.Domain;
using Conference.Services.Users;
using FluentResults;
using MediatR;

namespace Conference.Commands.Votes.Create
{
    public class CreateVoteCommandHandler : IRequestHandler<CreateVoteCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUsersService _usersService;

        public CreateVoteCommandHandler(IUnitOfWork unitOfWork, IUsersService usersService)
        {
            _unitOfWork = unitOfWork;
            _usersService = usersService;
        }

        public async Task<Result> Handle(CreateVoteCommand request, CancellationToken cancellationToken)
        {
            var meetingResult = await _unitOfWork.MeetingsRepository.GetById(request.MeetingId, cancellationToken);
            if (meetingResult.IsFailed)
                return Result.Fail("Совещание не найдено");

            var meeting = meetingResult.Value;

            var userResult = await _usersService.GetCurrentUser(cancellationToken);
            if (userResult.IsFailed)
                return Result.Fail("Ошибка аутентификации");

            var userVoted = meeting.Votes.Any(x => x.User == userResult.Value);
            if (userVoted)
                return Result.Fail("Пользователь уже участовал в данном голосовании");

            var option = meeting.Options.FirstOrDefault(x => x.Value == request.OptionName);
            if (option == null)
                return Result.Fail("Такого варианта для голосования не существует");

            meeting.Votes.Add(new Vote { Option = option, User = userResult.Value });

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
