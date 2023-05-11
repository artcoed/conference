using Conference.Commands.Users.Create;
using Conference.Commands.Users.Login;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Users
{
    public class UsersController : BaseController
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Create new user
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateAsync(CreateUserCommand createUserCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(createUserCommand, cancellationToken));
        }

        [HttpPost]
        public async Task<IActionResult> LoginAsync(LoginUserCommand loginUserCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(loginUserCommand, cancellationToken));
        }
    }
}
