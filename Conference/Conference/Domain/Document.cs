using FluentResults;

namespace Conference.Domain
{
    public class Document
    {
        public int Id { get; private set; } = 0;

        public string Source { get; }

        private Document()
        {
        }

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
