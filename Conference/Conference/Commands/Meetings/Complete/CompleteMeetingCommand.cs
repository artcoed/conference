using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Complete
{
    public record CompleteMeetingCommand : IRequest<Result>
    {
        public int MeetingId { get; init; }
    }
}
