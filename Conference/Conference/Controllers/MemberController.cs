using Conference.Commands.Members;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers
{
    public class MemberController : BaseController
    {
        private readonly IMediator _mediator;

        public MemberController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Create new voting
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateMemberAsync(CreateMemberCommand createVotingCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(createVotingCommand, cancellationToken));
        }
    }
}
