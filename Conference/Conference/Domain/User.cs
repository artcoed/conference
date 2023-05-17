using System.Text.Json.Serialization;

namespace Conference.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string DisplayingName { get; set; }
        public Role Role { get; set; }
        public List<Meeting> Meetings { get; set; }
        public bool IsDeleted { get; set; }
    }
}
