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
        public Task<IActionResult> GetReportByMeetingIdAsync()
        {
            throw new NotImplementedException();
        }
    }
}
