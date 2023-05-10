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
                .ValueGeneratedOnAdd()
                .UseIdentityColumn();

            builder.Property(x => x.StartTime);
            builder.Property(x => x.EndTime);

            builder.Property(x => x.HasCompleted);

            builder.Property(x => x.VotingTitle)
                .HasConversion(
                    votingTitle => votingTitle.Value,
                    value => VotingTitle.Create(value).Value);

            builder.HasMany(meeting => meeting.Agenda)
                .WithOne()
                .HasForeignKey("Meeting_Agenda");

            builder.HasMany(meeting => meeting.Documents)
                .WithOne()
                .HasForeignKey("Meeting_Documents");

            builder.HasMany(meeting => meeting.Notes)
                .WithOne()
                .HasForeignKey("Meeting_Notes");

            builder.HasMany(meeting => meeting.Decisions)
                .WithOne()
                .HasForeignKey("Meeting_Decisions");

            builder.HasMany(meeting => meeting.Votes)
                .WithOne()
                .HasForeignKey("Meeting_Votes");
        }
    }
}
