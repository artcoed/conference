﻿using Conference.Domain;
using FluentResults;

namespace Conference.Database.Meetings
{
    public interface IMeetingsRepository
    {
        Task<Result<Meeting>> GetById(int id, CancellationToken cancellationToken);
        Task Create(Meeting meeting, CancellationToken cancellationToken);
        Task<Result<IEnumerable<Meeting>>> GetAll(CancellationToken cancellationToken);
        Task<Result<IEnumerable<Meeting>>> GetByInvitedUser(int userId, CancellationToken cancellationToken);
    }
}
