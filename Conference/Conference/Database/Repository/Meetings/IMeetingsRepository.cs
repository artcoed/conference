using Conference.Domain;
using FluentResults;

namespace Conference.Database.Repository.Meetings
{
    public interface IMeetingsRepository
    {
        Task AddAsync(Meeting meeting, CancellationToken cancellationToken);
        Task<Result<Meeting>> GetByIdAsync(int id, CancellationToken cancellationToken);
        Task<Result<Meeting>> GetByIdForQuestAsync(int id, User user, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<Meeting>>> GetAllAsync(CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<Meeting>>> GetByInvitedUserAsync(int id, CancellationToken cancellationToken);
    }
}
