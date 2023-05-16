using Conference.Domain;

namespace Conference.Commands.Reports.GetByMeetingId
{
    public record ReportDto
    {
        public int Id { get; init; }
        public string MeetingTitle { get; init; }
        public bool MeetingCompleted { get; init; }
        public DateTime StartDateTime { get; init; }
        public DateTime EndDateTime { get; init; }
        public IReadOnlyList<string> Decisions { get; init; }
        public IReadOnlyList<Note> Notes { get; init; }
        public IReadOnlyList<string> Questions { get; init; }
        public IReadOnlyList<User> Users { get; init; }
        public bool HasVoting { get; init; }
        public string VotingTitle { get; init; }
        public IReadOnlyList<VoteDto> Votes { get; init; }
    }
}
