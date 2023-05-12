using FluentResults;
using MediatR;

namespace Conference.Commands.Users.Delete
{
    public record DeleteUserCommand : IRequest<Result>
    {
        public int UserId { get; init; }
    }
}
