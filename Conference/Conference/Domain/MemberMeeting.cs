namespace Conference.Domain
{
    public class MemberMeeting
    {
        public int Id { get; private set; }

        public Member Member { get; private set; }
        public Meeting Meeting { get; private set; }

        public MemberMeeting(Member member, Meeting meeting)
        {
            Member = member;
            Meeting = meeting;
        }
    }
}
