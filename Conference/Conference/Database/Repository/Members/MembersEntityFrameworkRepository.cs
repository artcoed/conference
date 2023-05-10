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

        public async Task Create(Member member, CancellationToken cancellationToken)
        {
            await _entityFrameworkContext.Members.AddAsync(member, cancellationToken);
        }

        public async Task<Result<Member>> GetMemberByLogin(string login, CancellationToken cancellationToken)
        {
            var member = await _entityFrameworkContext.Members.FirstOrDefaultAsync(x => x.Login == login, cancellationToken);
            if (member == null)
                return Result.Fail("Member not found");

            return Result.Ok(member);
        }

        public async Task<Result<IReadOnlyList<Member>>> GetMembersByLogin(IReadOnlyList<string> logins, CancellationToken cancellationToken)
        {
            IReadOnlyList<Member> members = await _entityFrameworkContext.Members
                .Where(x => logins.Any(l => l == x.Login))
                .ToListAsync(cancellationToken);

            if (members.Count <= 0)
                return Result.Fail("Members not found");

            return Result.Ok(members);
        }
    }
}
