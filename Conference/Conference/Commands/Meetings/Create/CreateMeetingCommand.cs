using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Create
{
    public record CreateMeetingCommand : IRequest<Result>
    {
        public DateTime StartMeetingTime { get; init; }

        public IReadOnlyList<string> Questions { get; init; }
        public IReadOnlyList<string> Documents { get; init; }
        public IReadOnlyList<string> MembersLogins { get; init; }
    }
}
