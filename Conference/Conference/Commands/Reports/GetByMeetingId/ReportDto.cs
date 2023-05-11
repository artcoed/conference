using Conference.Domain;

namespace Conference.Commands.Reports.GetByMeetingId
{
    public record ReportDto
    {
        public DateTime StartDateTime { get; init; }
        public DateTime EndDateTime { get; init; }
        public IReadOnlyList<Question> Questions { get; init; }
        public IReadOnlyList<User> Users { get; init; }
        public IReadOnlyList<Note> Notes { get; init; }
        public IReadOnlyList<Vote> Votes { get; init; }
        public IReadOnlyList<Decision> Decisions { get; init; }
    }
}
