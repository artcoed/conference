using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Reports.GetByMeetingId
{
    public class GetReportByMeetingIdQueryHandler : IRequestHandler<GetReportByMeetingIdQuery, Result<ReportDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetReportByMeetingIdQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<ReportDto>> Handle(GetReportByMeetingIdQuery request, CancellationToken cancellationToken)
        {
            var getMeetingResult = await _unitOfWork.MeetingsRepository.GetById(request.MeetingId, cancellationToken);
            if (getMeetingResult.IsFailed)
                return Result.Fail("Meeting not found");

            var meeting = getMeetingResult.Value;

            var report = new ReportDto
            {
                StartTime = meeting.StartTime,
                EndTime = meeting.EndTime,
                Agenda = meeting.Agenda.Select(x => x.Content).ToList(),
                Decisions = meeting.Decisions.Select(x => x.Content).ToList(),
                MembersLogin = meeting.Members.Select(x => x.Login).ToList(),
                Votes = meeting.Votes.ToList(),
                Notes = meeting.Notes.Select(x => x.Content).ToList()
            };

            return Result.Ok();
        }
    }
}
