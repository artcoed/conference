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
            return Result.Ok();
        }
    }
}
