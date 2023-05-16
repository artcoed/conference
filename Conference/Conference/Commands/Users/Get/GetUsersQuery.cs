using FluentResults;
using MediatR;

namespace Conference.Commands.Users.Get
{
    public record GetUsersQuery : IRequest<Result<IReadOnlyList<UserDto>>>
    {
    }
}
