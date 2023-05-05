using FluentResults;
using MediatR;

namespace Conference.Commands.Voitings.Create
{
    public record CreateVotingCommand : IRequest<Result>
    {
        public string Title { get; init; }

        public IReadOnlyList<string> Options { get; init; }
    }
}
