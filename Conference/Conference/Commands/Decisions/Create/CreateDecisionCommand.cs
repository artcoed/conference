using FluentResults;
using MediatR;

namespace Conference.Commands.Decisions.Create
{
    public record CreateDecisionCommand : IRequest<Result>
    {
        public int MeetingId { get; init; }
        public string Content { get; init; }
    }
}
