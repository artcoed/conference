using FluentResults;

namespace Conference.Domain
{
    public class Meeting
    {
        private List<Member> _members;
        private List<Note> _notes;
        private List<Decision> _decisions;

        public DateTime StartTime { get; }
        public Agenda Agenda { get; }
        public IReadOnlyList<Document> Documents { get; }
        public Voiting Voiting { get; private set; }
        public IReadOnlyList<Note> Notes => _notes;
        public IReadOnlyList<Member> Members => _members;

        public Meeting(DateTime startTime, Agenda agenda, List<Document> documents, List<Member> members)
        {
            StartTime = startTime;
            Agenda = agenda;
            Documents = documents;
            _members = members;
        }

        public Result<Report> Complete()
        {
            var startMeetingTime = StartTime;
            var agenda = Agenda;
            var members = _members;
            var notes = _notes;
            var voitingResult = Voiting.GetResult().Value;
            var decisions = _decisions;

            var report = new Report(startMeetingTime, agenda, members, notes, voitingResult, decisions);

            throw new NotImplementedException();
        }

        public Result AddVoiting(Voiting voiting)
        {
            Voiting = voiting;
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
    }
}
