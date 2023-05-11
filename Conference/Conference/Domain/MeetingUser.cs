namespace Conference.Domain
{
    public class MeetingUser
    {
        public int Id { get; set; }
        public Meeting Meeting { get; set; }
        public User User { get; set; }
    }
}
