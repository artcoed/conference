using Conference.Domain;
using Microsoft.EntityFrameworkCore;

namespace Conference.Database
{
    public class EntityFrameworkContext : DbContext, IEntityFrameworkContext
    {
        public DbSet<Decision> Decisions { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<MeetingUser> MeetingUsers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<Role> Roles { get; set; }

        public EntityFrameworkContext(DbContextOptions<EntityFrameworkContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
