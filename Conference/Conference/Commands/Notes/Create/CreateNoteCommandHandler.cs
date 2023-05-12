using Conference.Database.UnitOfWork;
using Conference.Domain;
using Conference.Services.Users;
using FluentResults;
using MediatR;

namespace Conference.Commands.Notes.Create
{
    public class CreateNoteCommandHandler : IRequestHandler<CreateNoteCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUsersService _usersService;

        public CreateNoteCommandHandler(IUnitOfWork unitOfWork, IUsersService usersService)
        {
            _unitOfWork = unitOfWork;
            _usersService = usersService;
        }

        public async Task<Result> Handle(CreateNoteCommand request, CancellationToken cancellationToken)
        {
            var meetingResult = await _unitOfWork.MeetingsRepository.GetByIdAsync(request.MeetingId, cancellationToken);
            if (meetingResult.IsFailed)
                return Result.Fail("Совещание не найдено");

            var meeting = meetingResult.Value;

            var userResult = await _usersService.GetCurrentUser(cancellationToken);
            if (userResult.IsFailed)
                return Result.Fail("Ошибка аутентификации");

            if (meeting.HasCompleted)
                return Result.Fail("Совещание уже было завершено");

            meetingResult.Value.Notes.Add(new Note
            {
                Value = request.Content,
                User = userResult.Value
            });

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
