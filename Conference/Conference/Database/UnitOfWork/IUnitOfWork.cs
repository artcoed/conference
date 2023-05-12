using Conference.Database.Repository.Meetings;
using Conference.Database.Repository.Users;

namespace Conference.Database.UnitOfWork
{
    public interface IUnitOfWork
    {
        IMeetingsRepository MeetingsRepository { get; }
        IUsersRepository UsersRepository { get; }

        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
