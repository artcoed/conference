using FluentResults;

namespace Conference.Domain
{
    public record Option
    {
        private int _id;

        public string Value { get; }

        private Option(string value)
        {
            Value = value;
        }

        public static Result<Option> Create(string value)
        {
            if (value.Length > 50)
                return Result.Fail("Too many option");

            if (value.Length < 1)
                return Result.Fail("Too small option");

            return Result.Ok(new Option(value));
        }
    }
}
