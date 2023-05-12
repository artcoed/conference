namespace Conference.Commands.Users.Login
{
    public record LoginDataDto
    {
        public string Token { get; init; }
        public string Role { get; init; }
    }
}