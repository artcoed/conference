using Conference.Domain;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace Conference.Database.Repository.Meetings
{
    public class MeetingsEntityFrameworkRepository : IMeetingsRepository
    {
        private readonly IEntityFrameworkContext _entityFrameworkContext;

        public MeetingsEntityFrameworkRepository(IEntityFrameworkContext entityFrameworkContext)
        {
            _entityFrameworkContext = entityFrameworkContext;
        }

        public Task Create(Meeting meeting, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Result<IEnumerable<Meeting>>> GetAll(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Result<Meeting>> GetById(int id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Result<IEnumerable<Meeting>>> GetByInvitedUser(string userLogin, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
