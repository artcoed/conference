using FluentResults;
using MediatR;

namespace Conference.Commands.Reports.GetByMeetingId
{
    public record GetByMeetingIdReportQuery : IRequest<Result<ReportDto>>
    {
        public int MeetingId { get; init; }
    }
}
