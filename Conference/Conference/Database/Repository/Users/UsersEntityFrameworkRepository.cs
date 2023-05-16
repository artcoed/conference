using Conference.Database.EntityFramework;
using Conference.Domain;
using FluentResults;
using Microsoft.EntityFrameworkCore;
using System.Threading;

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
                .Include(x => x.Role)
                .Include(x => x.Meetings)
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
            
            if (suspectUser == null)
                return Result.Fail("Пользователь не найден");

            return Result.Ok(suspectUser);
        }

        public async Task<Result<User>> GetExistedByLoginAsync(string login, CancellationToken cancellationToken)
        {
            var suspectUser = await _entityFrameworkContext.Users
                .Include(x => x.Role)
                .Include(x => x.Meetings)
                .FirstOrDefaultAsync(x => x.Login == login && x.IsDeleted == false, cancellationToken);

            if (suspectUser == null)
                return Result.Fail("Пользователь не найден");

            return Result.Ok(suspectUser);
        }

        public async Task<Result<User>> GetExistedByLoginAndPasswordAsync(string login, string password, CancellationToken cancellationToken)
        {
            var suspectUser = await _entityFrameworkContext.Users
                .Include(x => x.Role)
                .Include(x => x.Meetings)
                .FirstOrDefaultAsync(x => x.Login == login && x.Password == password && x.IsDeleted == false, cancellationToken);

            if (suspectUser == null)
                return Result.Fail("Пользователь не найден");

            return Result.Ok(suspectUser);
        }

        public async Task<Result<IReadOnlyList<User>>> GetByIdAsync(IReadOnlyList<int> id, CancellationToken cancellationToken)
        {
            IReadOnlyList<User> suspectUsers = await _entityFrameworkContext.Users
                .Where(x => id.Contains(x.Id))
                .Include(x => x.Role)
                .Include(x => x.Meetings)
                .ToListAsync(cancellationToken);

            if (!suspectUsers.Any())
                return Result.Fail("Пользователи не найдены");

            if (id.Count != suspectUsers.Count)
                return Result.Fail("Не все пользователи найдены");

            return Result.Ok(suspectUsers);
        }

        public async Task<Result<IReadOnlyList<User>>> GetExistedAll(CancellationToken cancellationToken)
        {
            IReadOnlyList<User> suspectUsers = await _entityFrameworkContext.Users
                .Where(x => x.IsDeleted == false)
                .Include(x => x.Role)
                .ToListAsync(cancellationToken);

            if (!suspectUsers.Any())
                return Result.Fail("Пользователи не найдены");

            return Result.Ok(suspectUsers);
        }
    }
}
