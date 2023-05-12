using Conference.Domain;
using FluentResults;

namespace Conference.Database.Repository.Notifications
{
    public interface INotificationsRepository
    {
        Task AddAsync(Notification notification, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<Notification>>> GetByUser(User user, CancellationToken cancellationToken);
        Task<Result<Notification>> GetById(int id, CancellationToken cancellationToken);
    }
}
