using Conference.Domain;
using FluentResults;

namespace Conference.Database.Repository.Meetings
{
    public interface IMeetingsRepository
    {
        Task<Result<Meeting>> GetById(int id, CancellationToken cancellationToken);
        Task Create(Meeting meeting, CancellationToken cancellationToken);
        Task<Result<IEnumerable<Meeting>>> GetAll(CancellationToken cancellationToken);
        Task<Result<IEnumerable<Meeting>>> GetByInvitedUser(string userLogin, CancellationToken cancellationToken);
    }
}
