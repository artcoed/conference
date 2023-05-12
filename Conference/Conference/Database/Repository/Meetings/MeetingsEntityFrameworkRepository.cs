﻿using Conference.Database.EntityFramework;
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

        public async Task AddAsync(Meeting meeting, CancellationToken cancellationToken)
        {
            await _entityFrameworkContext.Meetings.AddAsync(meeting, cancellationToken);
        }

        public async Task<Result<IReadOnlyList<Meeting>>> GetAllAsync(CancellationToken cancellationToken)
        {
            IReadOnlyList<Meeting> meetings = await _entityFrameworkContext.Meetings
                .Include(x => x.Questions)
                .Include(x => x.Documents)
                .Include(x => x.Notes)
                .Include(x => x.Decisions)
                .Include(x => x.Users)
                    .ThenInclude(u => u.Role)
                .Include(x => x.Options)
                .Include(x => x.Votes)
                    .ThenInclude(v => v.User)
                        .ThenInclude(u => u.Role)
                    .Include(v => v.Options)
                .ToListAsync(cancellationToken);
            if (!meetings.Any())
                return Result.Fail("Конференции не найдены");

            return Result.Ok(meetings);
        }

        public async Task<Result<Meeting>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var meeting = await _entityFrameworkContext.Meetings
                .Include(x => x.Questions)
                .Include(x => x.Documents)
                .Include(x => x.Notes)
                .Include(x => x.Decisions)
                .Include(x => x.Users)
                    .ThenInclude(u => u.Role)
                .Include(x => x.Options)
                .Include(x => x.Votes)
                    .ThenInclude(v => v.User)
                        .ThenInclude(u => u.Role)
                    .Include(v => v.Options)
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
            if (meeting == null)
                return Result.Fail("Конференция не найдена");

            return Result.Ok(meeting);
        }

        public async Task<Result<IReadOnlyList<Meeting>>> GetByInvitedUserAsync(int id, CancellationToken cancellationToken)
        {
            IReadOnlyList<Meeting> meetings = await _entityFrameworkContext.Meetings
                .Where(x => x.Users.Any(u => u.Id == id))
                .Include(x => x.Questions)
                .Include(x => x.Documents)
                .Include(x => x.Notes)
                .Include(x => x.Decisions)
                .Include(x => x.Users)
                    .ThenInclude(u => u.Role)
                .Include(x => x.Options)
                .Include(x => x.Votes)
                    .ThenInclude(v => v.User)
                        .ThenInclude(u => u.Role)
                    .Include(v => v.Options)
                .ToListAsync(cancellationToken);

            if (!meetings.Any())
                return Result.Fail("Конференции не найдены");

            return Result.Ok(meetings);
        }
    }
}
