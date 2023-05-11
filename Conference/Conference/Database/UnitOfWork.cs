using Conference.Database.Repository.Meetings;
using Conference.Database.Repository.Users;

namespace Conference.Database
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IEntityFrameworkContext _context;

        public IMeetingsRepository MeetingsRepository { get; }

        public IUsersRepository UsersRepository { get; }

        public UnitOfWork(IMeetingsRepository meetingsRepository, IUsersRepository usersRepository, IEntityFrameworkContext context)
        {
            MeetingsRepository = meetingsRepository;
            UsersRepository = usersRepository;
            _context = context;
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
