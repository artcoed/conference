namespace Conference.Commands.Meetings.GetById
{
    public record MeetingDto
    {
        public int Id { get; init; }
        public string MeetingTitle { get; init; }
        public bool HasCompleted { get; init; }
        public DateTime StartDateTime { get; init; }
        public DateTime EndDateTime { get; init; }
        public List<string> Questions { get; init; }
        public List<string> Decisions { get; init; }
        public bool HasVoting { get; init; }
        public string VotingTitle { get; init; }
        public List<string> VotingOptions { get; init; }
    }
}
