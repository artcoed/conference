using Conference.Database.UnitOfWork;
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
            var meetingResult = await _unitOfWork.MeetingsRepository.GetByIdAsync(request.MeetingId, cancellationToken);
            if (meetingResult.IsFailed)
                return Result.Fail("Совещание не найдено");

            var meeting = meetingResult.Value;
            if (meeting.HasCompleted)
                return Result.Fail("Совещание уже было завершено ранее");

            meeting.HasCompleted = true;
            var date = DateTime.Now;
            meeting.EndDate = date.Date;
            meeting.EndTime = date.TimeOfDay;

            return Result.Ok();
        }
    }
}
