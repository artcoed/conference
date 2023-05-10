using FluentResults;

namespace Conference.Domain
{
    public class Option
    {
        private readonly List<Member> _members = new();

        public int Id { get; private set; } = 0;

        public IReadOnlyList<Member> Members => _members;

        public string Value { get; }

        private Option()
        {
        }

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

        public void AddMember(Member member)
        {
            _members.Add(member);
        }
    }
}
