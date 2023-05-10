using FluentResults;

namespace Conference.Domain
{
    public class Meeting
    {
        private readonly List<Question> _agenda;
        private readonly List<Document> _documents;
        private readonly List<Note> _notes = new();
        private readonly List<Decision> _decisions = new();

        private readonly List<MemberMeeting> _memberMeetings = new();

        private  List<Option> _votes = new();

        private bool _hasCompleted;

        public int Id { get; private set; }

        public DateTime StartTime { get; }
        public DateTime EndTime { get; private set; }
        public VotingTitle VotingTitle { get; private set; }

        public IReadOnlyList<Member> Members => _memberMeetings.Select(x => x.Member).ToList();

        public IReadOnlyList<Question> Agenda => _agenda;
        public IReadOnlyList<Document> Documents => _documents;
        public IReadOnlyList<Note> Notes => _notes;
        public IReadOnlyList<Decision> Decisions => _decisions;
        public IReadOnlyList<Option> Votes => _votes;

        public IReadOnlyList<MemberMeeting> MemberMeetings => _memberMeetings;

        public Meeting(DateTime startTime, List<Question> agenda, List<Document> documents, List<Member> members)
        {
            StartTime = startTime;

            foreach (var member in members)
            {
                _memberMeetings.Add(new MemberMeeting(member, this));
            }

            _agenda = agenda;
            _documents = documents;
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
