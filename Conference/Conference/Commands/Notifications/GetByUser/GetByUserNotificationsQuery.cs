using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Notifications.GetByUser
{
    public record GetByUserNotificationsQuery : IRequest<Result<IReadOnlyList<Notification>>>
    {
    }
}
