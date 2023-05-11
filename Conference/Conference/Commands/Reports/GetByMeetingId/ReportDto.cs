using Conference.Domain;

namespace Conference.Commands.Reports.GetByMeetingId
{
    public record ReportDto
    {
        public DateTime StartDateTime { get; init; }
        public DateTime EndDateTime { get; init; }
        public List<Question> Questions { get; init; }
        public List<User> Users { get; init; }
        public List<Note> Notes { get; init; }
        public List<Option> Votes { get; init; }
        public List<Decision> Decisions { get; init; }
    }
}
