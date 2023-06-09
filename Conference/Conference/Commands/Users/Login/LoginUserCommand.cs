﻿using FluentResults;
using MediatR;

namespace Conference.Commands.Users.Login
{
    public record LoginUserCommand : IRequest<Result<LoginDataDto>>
    {
        public string Login { get; init; }
        public string Password { get; init; }
    }
}
