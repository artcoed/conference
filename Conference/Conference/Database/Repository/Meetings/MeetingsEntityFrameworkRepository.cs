using Conference.Domain;
using FluentResults;

namespace Conference.Database.Repository.Meetings
{
    public class MeetingsEntityFrameworkRepository : IMeetingsRepository
    {
        private readonly IEntityFrameworkContext _entityFrameworkContext;

        public MeetingsEntityFrameworkRepository(IEntityFrameworkContext entityFrameworkContext)
        {
            _entityFrameworkContext = entityFrameworkContext;
        }

        public Task AddAsync(Meeting meeting, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Result<IReadOnlyList<Meeting>>> GetAllAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Result<Meeting>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Result<IReadOnlyList<Meeting>>> GetByInvitedUserAsync(string userLogin, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
