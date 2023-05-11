using FluentResults;
using MediatR;

namespace Conference.Commands.Votes.Create
{
    public record CreateVoteCommand : IRequest<Result>
    {
        public int MeetingId { get; init; }
        public string OptionName { get; init; }
    }
}
