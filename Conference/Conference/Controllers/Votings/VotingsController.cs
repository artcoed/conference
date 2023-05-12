using Conference.Commands.Votings.Create;
using Conference.Services.Roles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Votings
{
    public class VotingsController : BaseController
    {
        private readonly IMediator _mediator;

        public VotingsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Create new voting
        /// </summary>
        [HttpPost]
        [Authorize(Policy = RolesConstants.Secretary)]
        public async Task<IActionResult> CreateVotingAsync(CreateVotingCommand createVotingCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(createVotingCommand, cancellationToken));
        }
    }
}
