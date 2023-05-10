using Conference.Database.Repository.Meetings;
using Conference.Database.Repository.Members;

namespace Conference.Database
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IEntityFrameworkContext _context;

        public IMeetingsRepository MeetingsRepository { get; }

        public IMembersRepository MembersRepository { get; }

        public UnitOfWork(IMeetingsRepository meetingsRepository, IMembersRepository membersRepository, IEntityFrameworkContext context)
        {
            MeetingsRepository = meetingsRepository;
            MembersRepository = membersRepository;
            _context = context;
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
