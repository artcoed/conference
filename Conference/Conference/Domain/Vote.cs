namespace Conference.Domain
{
    public class Vote
    {
        public int Id { get; set; }
        public Option Option { get; set; }
        public User User { get; set; }
        public Meeting Meeting { get; set; }
    }
}
