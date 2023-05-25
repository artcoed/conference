using Conference.Database.EntityFramework;
using Conference.Domain;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace Conference.Database.Repository.Documents
{
    public class DocumentsEntityFrameworkRepository : IDocumentsRepository
    {
        private readonly IEntityFrameworkContext _entityFrameworkContext;

        public DocumentsEntityFrameworkRepository(IEntityFrameworkContext entityFrameworkContext)
        {
            _entityFrameworkContext = entityFrameworkContext;
        }

        public async Task<Result<Document>> GetById(int id, CancellationToken cancellationToken)
        {
            var document = await _entityFrameworkContext.Documents.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
            if (document == null)
                return Result.Fail("Документ не найден");

            return Result.Ok(document);
        }

        public async Task<Result<Document>> GetByIdWithSource(int id, CancellationToken cancellationToken)
        {
            var document = await _entityFrameworkContext.Documents
                .Where(x => x.Id == id)
                .Include(x => x.Source)
                .FirstOrDefaultAsync(cancellationToken);
            if (document == null)
                return Result.Fail("Документ не найден");

            return Result.Ok(document);
        }
    }
}
