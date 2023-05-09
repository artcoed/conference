using Conference.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Conference.Database.EntityTypeConfigurations
{
    public class MeetingConfiguration : IEntityTypeConfiguration<Meeting>
    {
        public void Configure(EntityTypeBuilder<Meeting> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.VotingTitle)
                .HasConversion(
                    votingTitle => votingTitle.Value,
                    value => VotingTitle.Create(value).Value);

            builder.HasMany(meeting => meeting.Agenda)
                .WithOne()
                .HasForeignKey(question => question.Id);

            builder.HasMany(meeting => meeting.Documents)
                .WithOne()
                .HasForeignKey(document => document.Id);

            builder.HasMany(meeting => meeting.Notes)
                .WithOne()
                .HasForeignKey(note => note.Id);

            builder.HasMany(meeting => meeting.Decisions)
                .WithOne()
                .HasForeignKey(decision => decision.Id);

            builder.HasMany(meeting => meeting.Votes)
                .WithOne()
                .HasForeignKey(option => option.Id);
        }
    }
}
