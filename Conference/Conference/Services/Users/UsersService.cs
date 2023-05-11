using Conference.Domain;

namespace Conference.Services.Users
{
    public class UsersService : IUsersService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UsersService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public User GetCurrentUser()
        {
            throw new NotImplementedException();
        }
    }
}
