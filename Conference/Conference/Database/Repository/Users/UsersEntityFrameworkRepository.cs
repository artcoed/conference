using Conference.Database.EntityFramework;
using Conference.Domain;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace Conference.Database.Repository.Users
{
    public class UsersEntityFrameworkRepository : IUsersRepository
    {
        private readonly IEntityFrameworkContext _entityFrameworkContext;

        public UsersEntityFrameworkRepository(IEntityFrameworkContext entityFrameworkContext)
        {
            _entityFrameworkContext = entityFrameworkContext;
        }

        public async Task AddAsync(User user, CancellationToken cancellationToken)
        {
            await _entityFrameworkContext.Users.AddAsync(user, cancellationToken);
        }

        public async Task<Result<User>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var suspectUser = await _entityFrameworkContext.Users
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
            
            if (suspectUser == null)
                return Result.Fail("Пользователь не найден");

            return Result.Ok(suspectUser);
        }

        public async Task<Result<User>> GetByLoginAsync(string login, CancellationToken cancellationToken)
        {
            var suspectUser = await _entityFrameworkContext.Users
                .FirstOrDefaultAsync(x => x.Login == login, cancellationToken);

            if (suspectUser == null)
                return Result.Fail("Пользователь не найден");

            return Result.Ok(suspectUser);
        }

        public async Task<Result<User>> GetByLoginAndPasswordAsync(string login, string password, CancellationToken cancellationToken)
        {
            var suspectUser = await _entityFrameworkContext.Users
                .FirstOrDefaultAsync(x => x.Login == login && x.Password == password, cancellationToken);

            if (suspectUser == null)
                return Result.Fail("Пользователь не найден");

            return Result.Ok(suspectUser);
        }

        public async Task<Result<IReadOnlyList<User>>> GetByIdAsync(IReadOnlyList<int> id, CancellationToken cancellationToken)
        {
            IReadOnlyList<User> suspectUsers = await _entityFrameworkContext.Users
                .Where(x => id.Contains(x.Id))
                .ToListAsync(cancellationToken);

            if (!suspectUsers.Any())
                return Result.Fail("Пользователи не найдены");

            return Result.Ok(suspectUsers);
        }
    }
}
