namespace Conference.Commands.Users.Get
{
    public class UserDto
    {
        public int Id { get; init; }
        public string Login { get; init; }
        public string DisplayingName { get; init; }
        public string Role { get; init; }
    }
}
