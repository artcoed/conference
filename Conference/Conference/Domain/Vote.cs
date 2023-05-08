namespace Conference.Domain
{
    public record Vote
    {
        public Option Option { get; }
        private readonly Member _member;

        public Vote(Option option, Member member)
        {
            Option = option;
            _member = member;
        }
    }
}
