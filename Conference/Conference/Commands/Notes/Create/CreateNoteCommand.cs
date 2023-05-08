using FluentResults;
using MediatR;

namespace Conference.Commands.Notes.Create
{
    public record CreateNoteCommand : IRequest<Result>
    {
        public int MeetingId { get; init; }
        public string Content { get; init; }
    }
}
