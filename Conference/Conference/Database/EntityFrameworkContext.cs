using Conference.Database.EntityTypeConfigurations;
using Conference.Domain;
using Microsoft.EntityFrameworkCore;

namespace Conference.Database
{
    public class EntityFrameworkContext : DbContext, IEntityFrameworkContext
    {
        public DbSet<Decision> Decisions { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<Question> Questions { get; set; }

        public EntityFrameworkContext(DbContextOptions<EntityFrameworkContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new DecisionConfiguration());
            builder.ApplyConfiguration(new DocumentConfiguration());
            builder.ApplyConfiguration(new MeetingConfiguration());
            builder.ApplyConfiguration(new MemberConfiguration());
            builder.ApplyConfiguration(new NoteConfiguration());
            builder.ApplyConfiguration(new OptionConfiguration());
            builder.ApplyConfiguration(new QuestionConfiguration());
            
            base.OnModelCreating(builder);
        }
    }
}
