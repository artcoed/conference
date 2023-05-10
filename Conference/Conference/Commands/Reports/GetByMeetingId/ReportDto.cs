using Conference.Domain;

namespace Conference.Commands.Reports.GetByMeetingId
{
    public record ReportDto
    {
        public DateTime StartTime { get; init; }
        public DateTime EndTime { get; init; }
        public List<string> Agenda { get; init; }
        public List<string> MembersLogin { get; init; }
        public List<string> Notes { get; init; }
        public List<Option> Votes { get; init; }
        public List<string> Decisions { get; init; }
    }
}
