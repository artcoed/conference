using FluentResults;

namespace Conference.Domain
{
    public class Meeting
    {
        private readonly List<Member> _members;
        private readonly List<Note> _notes;
        private readonly List<Decision> _decisions;

        public DateTime StartTime { get; }
        public Agenda Agenda { get; }
        public IReadOnlyList<Document> Documents { get; }
        public Voting Voting { get; private set; }
        public IReadOnlyList<Note> Notes => _notes;
        public IReadOnlyList<Member> Members => _members;

        public Meeting(DateTime startTime, Agenda agenda, List<Document> documents, List<Member> members)
        {
            StartTime = startTime;
            Agenda = agenda;
            Documents = documents;
            _members = members;
        }

        public Result Complete()
        {
            var startMeetingTime = StartTime;
            var agenda = Agenda;
            var members = _members;
            var notes = _notes;
            var votes = Voting.Votes.ToList();
            var decisions = _decisions;

            var report = new Report(startMeetingTime, agenda, members, notes, votes, decisions);

            throw new NotImplementedException();
        }

        public Result AddVoiting(Voting voting)
        {
            Voting = voting;
            throw new NotImplementedException();
        }

        public Result AddNote(Note note)
        {
            throw new NotImplementedException();
        }

        public Result AddDecision(Decision decision)
        {
            throw new NotImplementedException();
        }

        public Result<Report> GetReport()
        {
            throw new NotImplementedException();
        }
    }
}
