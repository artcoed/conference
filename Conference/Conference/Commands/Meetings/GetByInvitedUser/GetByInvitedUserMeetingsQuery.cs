using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetByInvitedUser
{
    public record GetByInvitedUserMeetingsQuery : IRequest<Result<IEnumerable<Meeting>>>
    {
        public int UserId { get; init; }
    }
}
