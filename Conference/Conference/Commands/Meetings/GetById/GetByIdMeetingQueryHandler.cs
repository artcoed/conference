using Conference.Commands.Reports.GetByMeetingId;
using Conference.Database.UnitOfWork;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetById
{
    public class GetByIdMeetingQueryHandler : IRequestHandler<GetByIdMeetingQuery, Result<MeetingDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetByIdMeetingQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<MeetingDto>> Handle(GetByIdMeetingQuery request, CancellationToken cancellationToken)
        {
            var meetingResult = await _unitOfWork.MeetingsRepository.GetByIdAsync(request.MeetingId, cancellationToken);
            if (meetingResult.IsFailed)
                return Result.Fail("Совещание не найдено");

            var meeting = meetingResult.Value;

            var meetingDto = new MeetingDto
            {
                Id = meeting.Id,
                Decisions = meeting.Decisions.Select(x => x.Value).ToList(),
                Questions = meeting.Questions.Select(x => x.Value).ToList(),
                EndDateTime = meeting.EndDateTime,
                HasCompleted = meeting.HasCompleted,
                HasVoting = meeting.HasVoting,
                MeetingTitle = meeting.MeetingTitle,
                StartDateTime = meeting.StartDateTime,
                VotingOptions = meeting.Options.Select(x => x.Value).ToList(),
                VotingTitle = meeting.VotingTitle
            };

            return Result.Ok(meetingDto);
        }
    }
}
