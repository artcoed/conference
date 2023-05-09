using FluentResults;

namespace Conference.Domain
{
    public record Question
    {
        private int _id;

        public string Content { get; }

        private Question(string content)
        {
            Content = content;
        }

        public static Result<Question> Create(string content)
        {
            if (content.Length > 50)
                return Result.Fail("Too many question");

            if (content.Length < 3)
                return Result.Fail("Too small question");

            return Result.Ok(new Question(content));
        }
    }
}
