using FluentResults;

namespace Conference.Domain
{
    public record Document
    {
        private int _id;

        public string Source { get; }

        private Document(string source)
        {
            Source = source;
        }

        public static Result<Document> Create(string source)
        {
            if (source.Length < 3)
                return Result.Fail("Too small document");

            return Result.Ok(new Document(source));
        }
    }
}
