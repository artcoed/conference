using FluentResults;

namespace Conference.Domain
{
    public class Voiting
    {
        public string Title { get; }
        public IReadOnlyList<Option> Options { get; }

        public Voiting(string title, List<Option> options)
        {
            Title = title;
            Options = options;
        }

        public Result Vote(Member member, Option option)
        {
            throw new NotImplementedException();
        }

        public Result<VoitingResult> GetResult()
        {
            throw new NotImplementedException();
        }
    }
}
