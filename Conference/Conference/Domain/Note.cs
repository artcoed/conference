using FluentResults;

namespace Conference.Domain
{
    public class Note
    {
        public int Id { get; private set; } = 0;

        public string Content { get; }

        private Note()
        {
        }

        private Note(string content)
        {
            Content = content;
        }

        public static Result<Note> Create(string content)
        {
            if (content.Length > 50)
                return Result.Fail("Too many note");

            if (content.Length < 3)
                return Result.Fail("Too small note");

            return Result.Ok(new Note(content));
        }
    }
}
