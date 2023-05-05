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
        public Task<IActionResult> GetMeetingsInvationNotificationsAsync()
        {
            throw new NotImplementedException();
        }
    }
}
