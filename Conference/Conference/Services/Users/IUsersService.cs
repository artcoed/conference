using Conference.Domain;
using FluentResults;

namespace Conference.Services.Users
{
    public interface IUsersService
    {
        Task<Result<User>> GetCurrentUser(CancellationToken cancellationToken);
        string GenerateToken(User user);
    }
}