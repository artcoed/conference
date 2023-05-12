﻿using Conference.Commands.Users.Create;
using Conference.Commands.Users.CreateQuest;
using Conference.Commands.Users.Delete;
using Conference.Commands.Users.Login;
using Conference.Services.Roles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
        /// Create new user with role
        /// </summary>
        [HttpPost]
        [Authorize(Policy = RolesConstants.Administrator)]
        public async Task<IActionResult> CreateUserAsync(CreateUserCommand createUserCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(createUserCommand, cancellationToken));
        }

        /// <summary>
        /// Create new user with quest role
        /// </summary>
        [HttpPost]
        [Authorize(Policy = RolesConstants.Secretary)]
        public async Task<IActionResult> CreateQuestUserAsync(CreateQuestUserCommand createQuestUserCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(createQuestUserCommand, cancellationToken));
        }

        /// <summary>
        /// Delete user
        /// </summary>
        [HttpDelete]
        [Authorize(Policy = RolesConstants.Administrator)]
        public async Task<IActionResult> DeleteUserAsync(DeleteUserCommand deleteUserCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(deleteUserCommand, cancellationToken));
        }

        /// <summary>
        /// Login user
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> LoginUserAsync(LoginUserCommand loginUserCommand, CancellationToken cancellationToken)
        {
            return ConvertToActionResult(await _mediator.Send(loginUserCommand, cancellationToken));
        }
    }
}
