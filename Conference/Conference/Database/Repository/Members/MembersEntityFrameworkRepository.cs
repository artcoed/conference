using Conference.Domain;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace Conference.Database.Repository.Members
{
    public class MembersEntityFrameworkRepository : IMembersRepository
    {
        private readonly IEntityFrameworkContext _entityFrameworkContext;

        public MembersEntityFrameworkRepository(IEntityFrameworkContext entityFrameworkContext)
        {
            _entityFrameworkContext = entityFrameworkContext;
        }

        public Task Create(User member, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Result<User>> GetMemberByLogin(string login, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Result<IReadOnlyList<User>>> GetMembersByLogin(IReadOnlyList<string> logins, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
