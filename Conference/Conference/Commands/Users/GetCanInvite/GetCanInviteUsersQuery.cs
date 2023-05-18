using Conference.Commands.Users.Get;
using FluentResults;
using MediatR;

namespace Conference.Commands.Users.GetCanInvite
{
    public class GetCanInviteUsersQuery : IRequest<Result<IReadOnlyList<UserDto>>>
    {
    }
}
