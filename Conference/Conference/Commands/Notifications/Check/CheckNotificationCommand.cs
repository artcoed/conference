using FluentResults;
using MediatR;

namespace Conference.Commands.Notifications.Check
{
    public record CheckNotificationCommand : IRequest<Result>
    {
        public int NotificationId { get; init; }
    }
}
