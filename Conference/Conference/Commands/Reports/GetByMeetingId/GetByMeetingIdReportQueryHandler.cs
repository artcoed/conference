using Conference.Database;
using FluentResults;
using MediatR;

namespace Conference.Commands.Reports.GetByMeetingId
{
    public class GetByMeetingIdReportQueryHandler : IRequestHandler<GetByMeetingIdReportQuery, Result<ReportDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetByMeetingIdReportQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<ReportDto>> Handle(GetByMeetingIdReportQuery request, CancellationToken cancellationToken)
        {
            var meetingResult = await _unitOfWork.MeetingsRepository.GetByIdAsync(request.MeetingId, cancellationToken);
            if (meetingResult.IsFailed)
                return Result.Fail("Совещание не найдено");

            var meeting = meetingResult.Value;
            var reportDto = new ReportDto
            {
                StartDateTime = meeting.StartDateTime,
                EndDateTime = meeting.EndDateTime,
                Decisions = meeting.Decisions,
                Notes = meeting.Notes,
                Questions = meeting.Questions,
                Votes = meeting.Votes,
                Users = meeting.Users
            };

            return Result.Ok(reportDto);
        }
    }
}
