using Conference.Domain;
using FluentResults;

namespace Conference.Database.Repository.Members
{
    public interface IMembersRepository
    {
        Task Create(User member, CancellationToken cancellationToken);
        Task<Result<User>> GetMemberByLogin(string login, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<User>>> GetMembersByLogin(IReadOnlyList<string> logins, CancellationToken cancellationToken);
    }
}
