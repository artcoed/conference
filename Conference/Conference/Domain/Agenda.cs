namespace Conference.Domain
{
    public record Agenda
    {
        private int _id;

        public IReadOnlyList<Question> Questions { get; }

        public Agenda(List<Question> questions)
        {
            Questions = questions;
        }
    }
}
