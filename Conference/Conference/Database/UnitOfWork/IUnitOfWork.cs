using Conference.Database.Repository.Documents;
using Conference.Database.Repository.Meetings;
using Conference.Database.Repository.Notifications;
using Conference.Database.Repository.Roles;
using Conference.Database.Repository.Users;

namespace Conference.Database.UnitOfWork
{
    public interface IUnitOfWork
    {
        IMeetingsRepository MeetingsRepository { get; }
        IUsersRepository UsersRepository { get; }
        IRolesRepository RolesRepository { get; }
        INotificationsRepository NotificationsRepository { get; }
        IDocumentsRepository DocumentsRepository { get; }

        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
