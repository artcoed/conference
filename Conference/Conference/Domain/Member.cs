using FluentResults;

namespace Conference.Domain
{
    public class Member
    {
        public IReadOnlyList<Meeting> Meetings { get; }
        public IReadOnlyList<Notification> Notifications { get; }

        public Result AddNotification(Notification notification)
        {
            throw new NotImplementedException();
        }
    }
}
