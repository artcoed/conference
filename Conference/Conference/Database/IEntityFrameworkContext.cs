using Conference.Domain;
using Microsoft.EntityFrameworkCore;

namespace Conference.Database
{
    public interface IEntityFrameworkContext
    {
        DbSet<Decision> Decisions { get; }
        DbSet<Document> Documents { get; }
        DbSet<Meeting> Meetings { get; }
        DbSet<Member> Members { get; }
        DbSet<Note> Notes { get; }
        DbSet<Option> Options { get; }
        DbSet<Question> Questions { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
