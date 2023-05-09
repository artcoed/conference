using FluentResults;

namespace Conference.Domain
{
    public class Voting
    {
        private readonly List<Vote> _votes = new();
        
        public int Id { get; }

        public VotingTitle Title { get; }
        public IReadOnlyList<Option> Options { get; }
        public IReadOnlyList<Vote> Votes => _votes;

        public Voting(VotingTitle title, List<Option> options)
        {
            Title = title;
            Options = options;
        }

        public Result AddVote(Vote vote)
        {
            if (Options.Contains(vote.Option) == false)
                return Result.Fail("Voting havent this option");

            _votes.Add(vote);

            return Result.Ok();
        }
    }
}
