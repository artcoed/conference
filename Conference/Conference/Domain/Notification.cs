namespace Conference.Domain
{
    public class Notification
    {
        public int Id { get; set; }
        public Meeting Meeting { get; set; }
        public User User { get; set; }
        public bool IsChecked { get; set; }
    }
}
