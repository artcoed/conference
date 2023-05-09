using Conference.Domain;
using FluentResults;

namespace Conference.Database.Repository.Members
{
    public interface IMembersRepository
    {
        Task<Result<Member>> GetMemberById(int id, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<Member>>> GetMembersById(IReadOnlyList<int> id, CancellationToken cancellationToken);
    }
}
