using Conference.Domain;

namespace Conference.Commands.Reports.GetByMeetingId
{
    public record VoteDto
    {
        public int Id { get; init; }
        public string Value { get; init; }
        public List<User> Users { get; init; }
    }
}
