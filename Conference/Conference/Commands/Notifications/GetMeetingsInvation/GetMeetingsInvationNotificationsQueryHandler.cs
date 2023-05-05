using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Notifications.GetMeetingsInvation
{
    public class GetMeetingsInvationNotificationsQueryHandler : IRequestHandler<GetMeetingsInvationNotificationsQuery, Result<IEnumerable<Notification>>>
    {
        public Task<Result<IEnumerable<Notification>>> Handle(GetMeetingsInvationNotificationsQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
