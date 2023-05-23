using Conference.Commands.Roles.Get;
using Conference.Services.Roles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Roles
{
    public class RolesController : BaseController
    {
        private readonly IMediator _mediator;

        public RolesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Get all existed roles
        /// </summary>
        [HttpGet]
        [Authorize(Policy = RolesConstants.Secretary)]
        public async Task<IActionResult> GetRolesAsync([FromQuery] GetRolesQuery getRolesQuery, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(getRolesQuery, cancellationToken));
        }
    }
}
