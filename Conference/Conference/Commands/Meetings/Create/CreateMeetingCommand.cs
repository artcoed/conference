using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Create
{
    public record CreateMeetingCommand : IRequest<Result>
    {
        public string Title { get; set; }
        public DateTime StartMeetingDateTime { get; init; }

        public IReadOnlyList<string> Questions { get; init; }
        public IReadOnlyList<DocumentDto> Documents { get; init; }
        public IReadOnlyList<int> UsersId { get; init; }
    }
}
