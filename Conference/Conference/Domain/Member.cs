using FluentResults;

namespace Conference.Domain
{
    public class Member
    {
        private readonly List<Notification> _notifications = new();
        
        public int Id { get; }

        public IReadOnlyList<Notification> Notifications => _notifications;

        public Result AddNotification(Notification notification)
        {
            _notifications.Add(notification);
            return Result.Ok();
        }
    }
}
