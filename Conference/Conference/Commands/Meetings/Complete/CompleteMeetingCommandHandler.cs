using Conference.Database;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Complete
{
    public class CompleteMeetingCommandHandler : IRequestHandler<CompleteMeetingCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CompleteMeetingCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CompleteMeetingCommand request, CancellationToken cancellationToken)
        {
            var getMeetingResult = await _unitOfWork.MeetingsRepository.GetById(request.MeetingId, cancellationToken);
            if (getMeetingResult.IsFailed)
                return Result.Fail("Meeting not found");

            var completeResult = getMeetingResult.Value.Complete();
            if (completeResult.IsFailed)
                return Result.Fail("Complete meeting failed");

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
