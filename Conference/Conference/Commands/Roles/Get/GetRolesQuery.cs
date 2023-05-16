using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Roles.Get
{
    public record GetRolesQuery : IRequest<Result<IReadOnlyList<Role>>>
    {
    }
}
