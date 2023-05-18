using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetById
{
    public record GetByIdMeetingQuery : IRequest<Result<MeetingDto>>
    {
        public int MeetingId { get; init; }
    }
}
