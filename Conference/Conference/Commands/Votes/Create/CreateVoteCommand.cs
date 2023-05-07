using FluentResults;
using MediatR;

namespace Conference.Commands.Votes.Create
{
    public record CreateVoteCommand : IRequest<Result>
    {
        public int VoitingId { get; init; }
    }
}
