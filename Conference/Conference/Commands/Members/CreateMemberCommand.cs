using FluentResults;
using MediatR;

namespace Conference.Commands.Members
{
    public record CreateMemberCommand : IRequest<Result<int>>
    {
        
    }
}
