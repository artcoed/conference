using FluentResults;
using MediatR;

namespace Conference.Commands.Votings.Create
{
    public record CreateVotingCommand : IRequest<Result>
    {
        public int MeetingId { get; init; }
        public string Title { get; init; }

        public IReadOnlyList<string> Options { get; init; }
    }
}
