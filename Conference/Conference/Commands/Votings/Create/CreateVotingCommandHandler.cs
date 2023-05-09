﻿using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Votings.Create
{
    public class CreateVotingCommandHandler : IRequestHandler<CreateVotingCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateVotingCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateVotingCommand request, CancellationToken cancellationToken)
        {
            var getMeetingResult = await _unitOfWork.MeetingsRepository.GetById(request.MeetingId, cancellationToken);
            if (getMeetingResult.IsFailed)
                return Result.Fail("Meeting not found");

            var options = new List<Option>(request.Options.Select(x => Option.Create(x).Value));

            var addVotingResult = getMeetingResult.Value.AddVoiting(VotingTitle.Create(request.Title).Value, options);
            if (addVotingResult.IsFailed)
                return Result.Fail("Create voting failed");

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
