using FluentResults;

namespace Conference.Domain
{
    public class Voting
    {
        public string Title { get; }
        public IReadOnlyList<Option> Options { get; }

        public Voting(string title, List<Option> options)
        {
            Title = title;
            Options = options;
        }

        public Result Vote(Member member, Option option)
        {
            throw new NotImplementedException();
        }

        public Result<VotingResult> GetResult()
        {
            throw new NotImplementedException();
        }
    }
}
