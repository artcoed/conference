using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetForQuestById
{
    public record GetForQuestByIdQuery : IRequest<Result<QuestMeetingDto>>
    {
        public int MeetingId { get; init; }
    }
}
