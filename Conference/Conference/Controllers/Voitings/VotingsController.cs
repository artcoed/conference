using Conference.Commands.Voitings.Create;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Voitings
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
        public async Task<IActionResult> CreateVotingAsync(CreateVotingCommand createVotingCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(createVotingCommand, cancellationToken));
        }
    }
}
