using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetByInvitedUser
{
    public record GetByInvitedUserMeetingsQuery : IRequest<Result<IReadOnlyList<Meeting>>>
    {
    }
}
