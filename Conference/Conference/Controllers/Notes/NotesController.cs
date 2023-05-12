using Conference.Commands.Notes.Create;
using Conference.Services.Roles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Notes
{
    public class NotesController : BaseController
    {
        private readonly IMediator _mediator;

        public NotesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Create new note
        /// </summary>
        [HttpPost]
        [Authorize(Policy = RolesConstants.Quest)]
        public async Task<IActionResult> CreateNoteAsync(CreateNoteCommand createNoteCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(createNoteCommand, cancellationToken));
        }
    }
}
