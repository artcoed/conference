using Conference.Database.Repository.Meetings;
using Conference.Database.Repository.Members;

namespace Conference.Database
{
    public interface IUnitOfWork
    {
        IMeetingsRepository MeetingsRepository { get; }
        IMembersRepository MembersRepository { get; }

        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
