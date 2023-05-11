using Conference.Domain;
using FluentResults;

namespace Conference.Database.Repository.Users
{
    public interface IUsersRepository
    {
        Task AddAsync(User user, CancellationToken cancellationToken);
        Task<Result<User>> GetByLoginAndPasswordAsync(string login, string password, CancellationToken cancellationToken);
        Task<Result<User>> GetByIdAsync(int id, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<User>>> GetByIdAsync(IReadOnlyList<int> id, CancellationToken cancellationToken);
        Task<Result<User>> GetByLoginAsync(string login, CancellationToken cancellationToken);
    }
}
