using Conference.Commands.Decisions.Create;
using Conference.Services.Roles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Policy = RolesConstants.Secretary)]
        public async Task<IActionResult> CreateDecisionAsync(CreateDecisionCommand createDecisionCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(createDecisionCommand, cancellationToken));
        }
    }
}
