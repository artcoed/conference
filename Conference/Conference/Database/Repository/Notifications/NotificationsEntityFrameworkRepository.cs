using Conference.Database.EntityFramework;
using Conference.Domain;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace Conference.Database.Repository.Notifications
{
    public class NotificationsEntityFrameworkRepository : INotificationsRepository
    {
        private readonly IEntityFrameworkContext _entityFrameworkContext;

        public NotificationsEntityFrameworkRepository(IEntityFrameworkContext entityFrameworkContext)
        {
            _entityFrameworkContext = entityFrameworkContext;
        }

        public async Task AddAsync(Notification notification, CancellationToken cancellationToken)
        {
            await _entityFrameworkContext.Notifications.AddAsync(notification, cancellationToken);
        }

        public async Task<Result<Notification>> GetById(int id, CancellationToken cancellationToken)
        {
            var notification = await _entityFrameworkContext.Notifications
                .Include(x => x.Meeting)
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

            if (notification == null)
                return Result.Fail("Уведомление не найдено");

            return Result.Ok(notification);
        }

        public async Task<Result<IReadOnlyList<Notification>>> GetByUser(User user, CancellationToken cancellationToken)
        {
            IReadOnlyList<Notification> notifications = await _entityFrameworkContext.Notifications
                .Where(x => x.User == user)
                .Include(x => x.Meeting)
                .Include(x => x.User)
                .ToListAsync(cancellationToken);

            if (notifications.Count < 1)
                return Result.Fail("Уведомления не найдены");

            return Result.Ok(notifications);
        }
    }
}
