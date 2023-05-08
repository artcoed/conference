using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Notifications.GetMeetingsInvation
{
    public record GetMeetingsInvationNotificationsQuery : IRequest<Result<IEnumerable<Notification>>>
    {
        public int UserId { get; init; }
    }
}
