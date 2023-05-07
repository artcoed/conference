using Conference.Commands.Notifications.GetMeetingsInvation;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Notifications
{
    public class NotificationsController : BaseController
    {
        private readonly IMediator _mediator;

        public NotificationsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Get meetings invitation notifications
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetMeetingsInvationNotificationsAsync(GetMeetingsInvationNotificationsQuery getMeetingsInvationNotificationsQuery, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(getMeetingsInvationNotificationsQuery, cancellationToken));
        }
    }
}
