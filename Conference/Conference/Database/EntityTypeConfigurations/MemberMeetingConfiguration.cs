using Conference.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Conference.Database.EntityTypeConfigurations
{
    public class MemberMeetingConfiguration : IEntityTypeConfiguration<MemberMeeting>
    {
        public void Configure(EntityTypeBuilder<MemberMeeting> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.HasOne(x => x.Meeting)
                .WithMany()
                .HasForeignKey(x => x.Meeting);

            builder.HasOne(x => x.Member)
                .WithMany()
                .HasForeignKey(x => x.Member);
        }
    }
}
