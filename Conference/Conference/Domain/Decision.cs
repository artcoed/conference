using FluentResults;

namespace Conference.Domain
{
    public record Decision
    {
        public string Content { get; }

        private Decision(string content)
        {
            Content = content;
        }

        public static Result<Decision> Create(string content)
        {
            if (content.Length > 50)
                return Result.Fail("Too many decision");

            if (content.Length < 3)
                return Result.Fail("Too small decision");

            return Result.Ok(new Decision(content));
        }
    }
}
