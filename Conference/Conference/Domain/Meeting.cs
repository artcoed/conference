using FluentResults;

namespace Conference.Domain
{
    public class Meeting
    {
        private readonly List<Question> _agenda;
        private readonly List<Document> _documents;
        private readonly List<Note> _notes = new();
        private readonly List<Decision> _decisions = new();

        private readonly List<Member> _member = new();

        private  List<Option> _votes = new();

        private bool _hasCompleted;

        public int Id { get; private set; } = 0;

        public DateTime StartTime { get; }
        public DateTime EndTime { get; private set; }
        public VotingTitle VotingTitle { get; private set; }

        public IReadOnlyList<Member> Members => _member;

        public IReadOnlyList<Question> Agenda => _agenda;
        public IReadOnlyList<Document> Documents => _documents;
        public IReadOnlyList<Note> Notes => _notes;
        public IReadOnlyList<Decision> Decisions => _decisions;
        public IReadOnlyList<Option> Votes => _votes;

        public bool HasCompleted => _hasCompleted;

        private Meeting()
        {
        }

        public Meeting(DateTime startTime, List<Question> agenda, List<Document> documents, List<Member> members)
        {
            StartTime = startTime;

            _agenda = agenda;
            _documents = documents;
            _member = members;
        }

        public Result Complete(DateTime endTime)
        {
            if (_hasCompleted)
                return Result.Fail("Meeteng has arleady completed");

            _hasCompleted = true;
            EndTime = endTime;
            return Result.Ok();
        }
         
        public Result AddVoiting(VotingTitle title, List<Option> options)
        {
            VotingTitle = title;
            _votes = options;
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

        public Result Vote(Option option, Member member)
        {
            if (_votes.Contains(option) == false)
                return Result.Fail("Voting havent this option");

            _votes.First(o => o == option).AddMember(member);

            return Result.Ok();
        }
    }
}
