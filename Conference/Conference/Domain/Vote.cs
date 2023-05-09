namespace Conference.Domain
{
    public class Vote
    {
        public int Id { get; }

        public Option Option { get; }
        public Member Member { get; }

        public Vote(Option option, Member member)
        {
            Option = option;
            Member = member;
        }
    }
}
