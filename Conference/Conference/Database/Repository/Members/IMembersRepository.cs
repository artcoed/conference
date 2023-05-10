using Conference.Domain;
using FluentResults;

namespace Conference.Database.Repository.Members
{
    public interface IMembersRepository
    {
        Task Create(Member member, CancellationToken cancellationToken);
        Task<Result<Member>> GetMemberByLogin(string login, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<Member>>> GetMembersByLogin(IReadOnlyList<string> logins, CancellationToken cancellationToken);
    }
}
