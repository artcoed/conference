namespace Conference.Domain
{
    public class Agenda
    {
        public IReadOnlyList<Question> Questions { get; }

        public Agenda(List<Question> questions)
        {
            Questions = questions;
        }
    }
}
