using FluentResults;

namespace Conference.Domain
{
    public record VotingTitle
    {
        public string Value { get; }

        private VotingTitle()
        {
        }

        private VotingTitle(string value)
        {
            Value = value;
        }

        public static Result<VotingTitle> Create(string value)
        {
            if (value.Length > 50)
                return Result.Fail("Voting title too big");

            if (value.Length < 1)
                return Result.Fail("Voting title too small");

            return Result.Ok(new VotingTitle(value));
        }
    }
}
