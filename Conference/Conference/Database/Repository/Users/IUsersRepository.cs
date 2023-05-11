using Conference.Domain;
using FluentResults;

namespace Conference.Database.Repository.Users
{
    public interface IUsersRepository
    {
        Task AddAsync(User user, CancellationToken cancellationToken);
        Task<Result<User>> GetByLoginAndPassword(string login, string password, CancellationToken cancellationToken);
        Task<Result<User>> GetById(int id, CancellationToken cancellationToken);
        Task<Result<User>> GetByLogin(string login, CancellationToken cancellationToken);
    }
}
