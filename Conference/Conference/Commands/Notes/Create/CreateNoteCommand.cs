using FluentResults;
using MediatR;

namespace Conference.Commands.Notes.Create
{
    public record CreateNoteCommand : IRequest<Result>
    {
        public string Content { get; init; }
    }
}
