using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Reports.GetByMeetingId
{
    public class GetReportByMeetingIdQueryHandler : IRequestHandler<GetReportByMeetingIdQuery, Result<Report>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetReportByMeetingIdQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<Report>> Handle(GetReportByMeetingIdQuery request, CancellationToken cancellationToken)
        {
            var getMeetingResult = await _unitOfWork.MeetingsRepository.GetById(request.MeetingId, cancellationToken);
            if (getMeetingResult.IsFailed)
                return Result.Fail("Meeting not found");

            var getReportResult = getMeetingResult.Value.GetReport();
            if (getReportResult.IsFailed)
                return Result.Fail("Report not found");

            return Result.Ok(getReportResult.Value);
        }
    }
}
