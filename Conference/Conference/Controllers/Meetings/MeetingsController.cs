using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Meetings
{
    public class MeetingsController : BaseController
    {
        private readonly IMediator _mediator;

        public MeetingsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Get list with all meetings
        /// </summary>
        [HttpGet]
        public Task<IActionResult> GetMeetingsAsync()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Create new meeting
        /// </summary>
        [HttpPost]
        public Task<IActionResult> CreateMeetingAsync()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get meetings to which the user is invited
        /// </summary>
        [HttpGet]
        public Task<IActionResult> GetMeetingsByInvitedAsync()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Complete meeting
        /// </summary>
        [HttpPost]
        public Task<IActionResult> CompleteMeetingAsync()
        {
            throw new NotImplementedException();
        }
    }
}
