using FluentResults;
using MediatR;

namespace Conference.Commands.Users.Create
{
    public record CreateUserCommand : IRequest<Result>
    {
        public string Login { get; init; }
        public string Password { get; init; }
        public string Role { get; init; }
        public string Name { get; init; }
    }
}
