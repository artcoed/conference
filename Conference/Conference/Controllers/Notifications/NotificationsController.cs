using Conference.Commands.Notifications.Check;
using Conference.Commands.Notifications.GetByUser;
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
        /// Check notification
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> CheckNotificationAsync(CheckNotificationCommand checkNotificationCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(checkNotificationCommand, cancellationToken));
        }

        /// <summary>
        /// Get notifications to which the user is invited
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetByUserNotificationsAsync([FromQuery] GetByUserNotificationsQuery getByUserNotificationsQuery, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(getByUserNotificationsQuery, cancellationToken));
        }
    }
}
