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
    }
}
