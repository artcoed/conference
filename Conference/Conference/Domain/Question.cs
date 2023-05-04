namespace Conference.Domain
{
    public class Question
    {
        public string Content { get; }

        public Question(string content)
        {
            Content = content;
        }
    }
}
