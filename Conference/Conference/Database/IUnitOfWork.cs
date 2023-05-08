using Conference.Database.Meetings;
using Conference.Database.MembersRepository;

namespace Conference.Database
{
    public interface IUnitOfWork
    {
        IMeetingsRepository MeetingsRepository { get; }
        IMembersRepository MembersRepository { get; }

        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
