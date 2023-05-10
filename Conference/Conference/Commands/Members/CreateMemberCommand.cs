using FluentResults;
using MediatR;

namespace Conference.Commands.Members
{
    public record CreateMemberCommand : IRequest<Result>
    {
        public string Login { get; init; }
    }
}
