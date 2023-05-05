using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Reports.GetByMeetingId
{
    public class GetReportByMeetingIdQueryHandler : IRequestHandler<GetReportByMeetingIdQuery, Result<Report>>
    {
        public Task<Result<Report>> Handle(GetReportByMeetingIdQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
