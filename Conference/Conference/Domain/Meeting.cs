using FluentResults;

namespace Conference.Domain
{
    public class Meeting
    {
        private readonly List<Member> _members;
        private readonly List<Note> _notes = new();
        private readonly List<Decision> _decisions = new();

        private Report _report;

        public int Id { get; }

        public DateTime StartTime { get; }
        public Agenda Agenda { get; }
        public Voting Voting { get; private set; }

        public IReadOnlyList<Document> Documents { get; }
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
            var agenda = new Agenda(Agenda.Questions.ToList());
            var members = _members.ToList();
            var notes = _notes.ToList();
            var votes = Voting.Votes.ToList();
            var decisions = _decisions.ToList();

            _report = new Report(startMeetingTime, agenda, members, notes, votes, decisions);

            return Result.Ok();
        }

        public Result AddVoiting(Voting voting)
        {
            Voting = voting;
            return Result.Ok();
        }

        public Result AddNote(Note note)
        {
            _notes.Add(note);
            return Result.Ok();
        }

        public Result AddDecision(Decision decision)
        {
            _decisions.Add(decision);
            return Result.Ok();
        }

        public Result<Report> GetReport()
        {
            if (_report == null)
                return Result.Fail("Have not report");

            return Result.Ok(_report);
        }
    }
}
