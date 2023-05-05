using FluentResults;
using MediatR;

namespace Conference.Commands.Decisions.Create
{
    public record CreateDecisionCommand : IRequest<Result>
    {
        public string Content { get; init; }
    }
}
