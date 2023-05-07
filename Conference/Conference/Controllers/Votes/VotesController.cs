using Conference.Commands.Votes.Create;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Votes
{
    public class VotesController : BaseController
    {
        private readonly IMediator _mediator;

        public VotesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Create vote for voting
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateVoteAsync(CreateVoteCommand createVoteCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(createVoteCommand, cancellationToken));
        }
    }
}
