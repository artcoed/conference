namespace Conference.Domain
{
    public class Member
    {
        public int Id { get; private set; } = 0;
        public string Login { get; private set; }

        private Member()
        {
        }

        public Member(string login)
        {
            Login = login;
        }
    }
}
