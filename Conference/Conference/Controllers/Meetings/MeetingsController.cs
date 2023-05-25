using Conference.Commands.Meetings.Complete;
using Conference.Commands.Meetings.Create;
using Conference.Commands.Meetings.DownloadFileById;
using Conference.Commands.Meetings.Get;
using Conference.Commands.Meetings.GetById;
using Conference.Commands.Meetings.GetByInvitedUser;
using Conference.Commands.Meetings.GetForQuestById;
using Conference.Database.UnitOfWork;
using Conference.Services.Roles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Meetings
{
    public class MeetingsController : BaseController
    {
        private readonly IMediator _mediator;
        private readonly IUnitOfWork _unitOfWork;

        public MeetingsController(IMediator mediator, IUnitOfWork unitOfWork)
        {
            _mediator = mediator;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Create new meeting
        /// </summary>
        [HttpPost]
        [Authorize(Policy = RolesConstants.Secretary)]
        public async Task<IActionResult> CreateMeetingAsync(CreateMeetingCommand createMeetingCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(createMeetingCommand, cancellationToken));
        }

        /// <summary>
        /// Complete meeting
        /// </summary>
        [HttpPost]
        [Authorize(Policy = RolesConstants.Secretary)]
        public async Task<IActionResult> CompleteMeetingAsync(CompleteMeetingCommand completeMeetingCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(completeMeetingCommand, cancellationToken));
        }

        /// <summary>
        /// Get list with all meetings
        /// </summary>
        [HttpGet]
        [Authorize(Policy = RolesConstants.Secretary)]
        public async Task<IActionResult> GetMeetingsAsync([FromQuery] GetMeetingsQuery getMeetingsQuery, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(getMeetingsQuery, cancellationToken));
        }

        /// <summary>
        /// Get meetings to which the user is invited
        /// </summary>
        [HttpGet]
        [Authorize(Policy = RolesConstants.Quest)]
        public async Task<IActionResult> GetByInvitedUserMeetingsAsync([FromQuery] GetByInvitedUserMeetingsQuery getByInvitedUserMeetingsQuery, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(getByInvitedUserMeetingsQuery, cancellationToken));
        }

        /// <summary>
        /// Get secretary meeting data by id
        /// </summary>
        [HttpGet]
        [Authorize(Policy = RolesConstants.Secretary)]
        public async Task<IActionResult> GetByIdMeetingAsync([FromQuery] GetByIdMeetingQuery getByIdMeetingQuery, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(getByIdMeetingQuery, cancellationToken));
        }

        /// <summary>
        /// Get quest meeting data by id
        /// </summary>
        [HttpGet]
        [Authorize(Policy = RolesConstants.Quest)]
        public async Task<IActionResult> GetForQuestByIdAsync([FromQuery] GetForQuestByIdQuery getForQuestByIdQuery, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(getForQuestByIdQuery, cancellationToken));
        }

        [HttpGet]
        public async Task<IActionResult> DownloadFileByIdAsync([FromQuery] DownloadFileByIdQuery downloadFileByIdQuery, CancellationToken cancellationToken)
        {
            
            var documentResult  = await _unitOfWork.DocumentsRepository.GetByIdWithSource(downloadFileByIdQuery.DocumentId, cancellationToken);

            if (documentResult.IsFailed)
                return NotFound();
            
            var document = documentResult.Value;
            var documentSource = document.Source;

            var mimeType = "application/octet-stream";

            var s = documentSource.Value.Remove(0, 37);
            var documentBytes = Convert.FromBase64String(s);

            return new FileContentResult(documentBytes, mimeType)
            {
                FileDownloadName = document.Name
            };
        }
    }
}
