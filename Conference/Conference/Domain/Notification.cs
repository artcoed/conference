namespace Conference.Domain
{
    public class Notification
    {
        public Meeting Meeting { get; }

        public Notification(Meeting meeting)
        {
            Meeting = meeting;
        }
    }
}
