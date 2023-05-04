namespace Conference.Domain
{
    public class Report
    {
        public DateTime StartMeetingTime { get; }
        public Agenda Agenda { get; }
        public IReadOnlyList<Member> Members { get; }
        public IReadOnlyList<Note> Notes { get; }
        public VoitingResult VoitingResult { get; }
        public IReadOnlyList<Decision> Decisions { get; }

        public Report(DateTime startMeetingTime, Agenda agenda,
            List<Member> members, List<Note> notes, 
            VoitingResult voitingResult, List<Decision> decisions)
        {
            StartMeetingTime = startMeetingTime;
            Agenda = agenda;
            Members = members;
            Notes = notes;
            VoitingResult = voitingResult;
            Decisions = decisions;
        }
    }
}
