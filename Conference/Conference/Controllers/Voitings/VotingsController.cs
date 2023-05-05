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
        public Task<IActionResult> CreateVotingAsync()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Vote in voting
        /// </summary>
        [HttpPost]
        public Task<IActionResult> VoteAsync()
        {
            throw new NotImplementedException();
        }
    }
}
