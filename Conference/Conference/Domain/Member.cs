namespace Conference.Domain
{
    public class Member
    {
        public string Login { get; private set; }

        public Member(string login)
        {
            Login = login;
        }
    }
}
