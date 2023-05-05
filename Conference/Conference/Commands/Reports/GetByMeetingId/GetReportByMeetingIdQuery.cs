using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Reports.GetByMeetingId
{
    public record GetReportByMeetingIdQuery : IRequest<Result<Report>>
    {
        public int MeetingId { get; init; }
    }
}
