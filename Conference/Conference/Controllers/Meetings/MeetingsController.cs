using Conference.Commands.Meetings.Complete;
using Conference.Commands.Meetings.Create;
using Conference.Commands.Meetings.Get;
using Conference.Commands.Meetings.GetByInvitedUser;
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
        /// Create new meeting
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateMeetingAsync(CreateMeetingCommand createMeetingCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(createMeetingCommand, cancellationToken));
        }

        /// <summary>
        /// Complete meeting
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CompleteMeetingAsync(CompleteMeetingCommand completeMeetingCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(completeMeetingCommand, cancellationToken));
        }

        /// <summary>
        /// Get list with all meetings
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetMeetingsAsync([FromQuery] GetMeetingsQuery getMeetingsQuery, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(getMeetingsQuery, cancellationToken));
        }

        /// <summary>
        /// Get meetings to which the user is invited
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetByInvitedUserMeetingsAsync([FromQuery] GetByInvitedUserMeetingsQuery getByInvitedUserMeetingsQuery, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(getByInvitedUserMeetingsQuery, cancellationToken));
        }
    }
}
