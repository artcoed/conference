using Conference.Domain;

namespace Conference.Services.Users
{
    public interface IUsersService
    {
        User GetCurrentUser();
    }
}