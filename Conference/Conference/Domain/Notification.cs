namespace Conference.Domain
{
    public class Notification
    {
        public int Id { get; }

        public Meeting Meeting { get; }

        public Notification(Meeting meeting)
        {
            Meeting = meeting;
        }
    }
}
