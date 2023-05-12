using Conference.Database.EntityFramework;
using Conference.Database.Repository.Meetings;
using Conference.Database.Repository.Roles;
using Conference.Database.Repository.Users;

namespace Conference.Database.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IEntityFrameworkContext _context;

        public IMeetingsRepository MeetingsRepository { get; }
        public IUsersRepository UsersRepository { get; }
        public IRolesRepository RolesRepository { get; }

        public UnitOfWork(IEntityFrameworkContext context, IMeetingsRepository meetingsRepository, IUsersRepository usersRepository, IRolesRepository rolesRepository)
        {
            _context = context;
            MeetingsRepository = meetingsRepository;
            UsersRepository = usersRepository;
            RolesRepository = rolesRepository;
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
