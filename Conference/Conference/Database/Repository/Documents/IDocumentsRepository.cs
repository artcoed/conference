using Conference.Domain;
using FluentResults;

namespace Conference.Database.Repository.Documents
{
    public interface IDocumentsRepository
    {
        Task<Result<Document>> GetById(int id, CancellationToken cancellationToken);
        Task<Result<Document>> GetByIdWithSource(int id, CancellationToken cancellationToken);
    }
}
