﻿using Conference.Commands.Reports.GetByMeetingId;
using Conference.Services.Roles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Policy = RolesConstants.Secretary)]
        public async Task<IActionResult> GetByMeetingIdAsync([FromQuery] GetByMeetingIdReportQuery getReportByMeetingIdQuery, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(getReportByMeetingIdQuery, cancellationToken));
        }
    }
}
