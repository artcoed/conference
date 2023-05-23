namespace Conference.Domain
{
    public class Meeting
    {
        public int Id { get; set; }
        public string MeetingTitle { get; set; }
        public DateTime StartDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public DateTime StartDateTime => StartDate + StartTime;
        public DateTime EndDate { get; set; }
        public TimeSpan EndTime { get; set; }
        public DateTime EndDateTime => EndDate + EndTime;
        public bool HasCompleted { get; set; }
        public List<Question> Questions { get; set; }
        public List<Document> Documents { get; set; }
        public List<Note> Notes { get; set; }
        public List<Decision> Decisions { get; set; }
        public List<User> Users { get; set; }

        public string VotingTitle { get; set; }
        public List<Option> Options { get; set; }
        public List<Vote> Votes { get; set; }
        public bool HasVoting { get; set; }
    }
}
