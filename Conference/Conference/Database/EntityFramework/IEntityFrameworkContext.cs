using Conference.Domain;
using Microsoft.EntityFrameworkCore;

namespace Conference.Database.EntityFramework
{
    public interface IEntityFrameworkContext
    {
        DbSet<Decision> Decisions { get; }
        DbSet<Document> Documents { get; }
        DbSet<Meeting> Meetings { get; }
        DbSet<User> Users { get; }
        DbSet<Note> Notes { get; }
        DbSet<Option> Options { get; }
        DbSet<Question> Questions { get; }
        DbSet<Vote> Votes { get; }
        DbSet<Role> Roles { get; }
        DbSet<Notification> Notifications { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
