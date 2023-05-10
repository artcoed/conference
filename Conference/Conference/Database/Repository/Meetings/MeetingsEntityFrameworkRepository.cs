using Conference.Domain;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace Conference.Database.Repository.Meetings
{
    public class MeetingsEntityFrameworkRepository : IMeetingsRepository
    {
        private readonly IEntityFrameworkContext _entityFrameworkContext;

        public MeetingsEntityFrameworkRepository(IEntityFrameworkContext entityFrameworkContext)
        {
            _entityFrameworkContext = entityFrameworkContext;
        }

        public async Task Create(Meeting meeting, CancellationToken cancellationToken)
        {
            await _entityFrameworkContext.Meetings.AddAsync(meeting, cancellationToken);
        }

        public async Task<Result<IEnumerable<Meeting>>> GetAll(CancellationToken cancellationToken)
        {
            IEnumerable<Meeting> meetings = await _entityFrameworkContext.Meetings
                .Include(x => x.Members)
                .Include(x => x.Agenda)
                .Include(x => x.Documents)
                .Include(x => x.Notes)
                .Include(x => x.Decisions)
                .Include(x => x.Votes)
                .ToListAsync(cancellationToken);
            if (!meetings.Any())
                return Result.Fail("Meetings not found");

            return Result.Ok(meetings);
        }

        public async Task<Result<Meeting>> GetById(int id, CancellationToken cancellationToken)
        {
            var meeting = await _entityFrameworkContext.Meetings.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
            if (meeting == null)
                return Result.Fail("Meeting not found");
         
            return Result.Ok(meeting);
        }

        public async Task<Result<IEnumerable<Meeting>>> GetByInvitedUser(string userLogin, CancellationToken cancellationToken)
        {
            IEnumerable<Meeting> meetings = await _entityFrameworkContext.Meetings
                .Where(x => x.Members.Any(m => m.Login == userLogin))
                .Include(x => x.Members)
                .Include(x => x.Agenda)
                .Include(x => x.Documents)
                .Include(x => x.Notes)
                .Include(x => x.Decisions)
                .Include(x => x.Votes)
                .ToListAsync(cancellationToken);

            if (!meetings.Any())
                return Result.Fail("Meetings not found");

            return Result.Ok(meetings);
        }
    }
}
