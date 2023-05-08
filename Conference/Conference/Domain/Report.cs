namespace Conference.Domain
{
    public class Report
    {
        public DateTime StartMeetingTime { get; }
        public Agenda Agenda { get; }
        public IReadOnlyList<Member> Members { get; }
        public IReadOnlyList<Note> Notes { get; }
        public IReadOnlyList<Vote> Votes { get; }
        public IReadOnlyList<Decision> Decisions { get; }

        public Report(DateTime startMeetingTime, Agenda agenda,
            List<Member> members, List<Note> notes, 
            List<Vote> votes, List<Decision> decisions)
        {
            StartMeetingTime = startMeetingTime;
            Agenda = agenda;
            Members = members;
            Notes = notes;
            Votes = votes;
            Decisions = decisions;
        }
    }
}
