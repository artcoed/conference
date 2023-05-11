using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Votings.Create
{
    public class CreateVotingCommandHandler : IRequestHandler<CreateVotingCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateVotingCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateVotingCommand request, CancellationToken cancellationToken)
        {
            var meetingResult = await _unitOfWork.MeetingsRepository.GetById(request.MeetingId, cancellationToken);
            if (meetingResult.IsFailed)
                return Result.Fail("Совещание не найдено");

            var meeting = meetingResult.Value;

            if (meeting.HasVoting)
                return Result.Fail("Голосование уже создано");

            meeting.HasVoting = true;
            meeting.VotingTitle = request.Title;
            meeting.Options = request.Options.Select(x => new Option { Value = x })
                .ToList();

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
