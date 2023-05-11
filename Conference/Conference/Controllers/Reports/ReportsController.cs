using Conference.Commands.Reports.GetByMeetingId;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Reports
{
    public class ReportsController : BaseController
    {
        private readonly IMediator _mediator;

        public ReportsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Get report
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetByMeetingIdAsync([FromQuery] GetByMeetingIdReportQuery getReportByMeetingIdQuery, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(getReportByMeetingIdQuery, cancellationToken));
        }
    }
}
