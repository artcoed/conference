using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Decisions
{
    public class DecisionsController : BaseController
    {
        private readonly IMediator _mediator;

        public DecisionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Create new decision
        /// </summary>
        [HttpPost]
        public Task<IActionResult> CreateDecisionAsync()
        {
            throw new NotImplementedException();
        }
    }
}
