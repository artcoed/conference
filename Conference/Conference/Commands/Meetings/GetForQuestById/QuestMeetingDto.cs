namespace Conference.Commands.Meetings.GetForQuestById
{
    public record QuestMeetingDto
    {
        public int Id { get; init; }
        public string MeetingTitle { get; init; }
        public bool HasCompleted { get; init; }
        public List<string> Notes { get; init; }
        public List<QuestDocumentDto> Documents { get; init; }
        public bool HasVoting { get; init; }
        public string VotingTitle { get; init; }
        public List<string> VotingOptions { get; init; }
        public bool HasVoted { get; init; }
        public string SelectedOption { get; init; }
        public List<string> Questions { get; init; }
    }

    public record QuestDocumentDto
    {
        public int Id { get; init; }
        public string Name { get; init; }
    }
}
