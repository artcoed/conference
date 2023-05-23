 namespace Conference.Commands.Meetings.Get
{
    public record MeetingDto
    {
        public int Id { get; init; }
        public string MeetingTitle { get; init; }
        public DateTime StartDateTime { get; init; }
        public DateTime EndDateTime { get; init; }
        public bool HasCompleted { get; init; }
    }
}
