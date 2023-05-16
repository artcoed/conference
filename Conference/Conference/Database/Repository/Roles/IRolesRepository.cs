using Conference.Domain;
using FluentResults;

namespace Conference.Database.Repository.Roles
{
    public interface IRolesRepository
    {
        Task<Result<Role>> GetByName(string name, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<Role>>> GetAll(CancellationToken cancellationToken);
    }
}
