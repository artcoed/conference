using Conference.Database.EntityFramework;
using Conference.Domain;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace Conference.Database.Repository.Roles
{
    public class RolesEntityFrameworkRepository : IRolesRepository
    {
        private readonly IEntityFrameworkContext _context;

        public RolesEntityFrameworkRepository(IEntityFrameworkContext context)
        {
            _context = context;
        }

        public async Task<Result<IReadOnlyList<Role>>> GetAll(CancellationToken cancellationToken)
        {
            return await _context.Roles.ToListAsync(cancellationToken);
        }

        public async Task<Result<Role>> GetByName(string name, CancellationToken cancellationToken)
        {
            var role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == name, cancellationToken);
            if (role == null)
                return Result.Fail("Роль не найдена");

            return Result.Ok(role);
        }
    }
}
