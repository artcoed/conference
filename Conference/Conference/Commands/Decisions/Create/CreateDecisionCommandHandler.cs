using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Decisions.Create
{
    public class CreateDecisionCommandHandler : IRequestHandler<CreateDecisionCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateDecisionCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateDecisionCommand request, CancellationToken cancellationToken)
        {
            var getMeetingResult = await _unitOfWork.MeetingsRepository.GetById(request.MeetingId, cancellationToken);
            if (getMeetingResult.IsFailed)
                return Result.Fail("Meeting not found");

            var decision = Decision.Create(request.Content).Value;

            var addDecisionResult = getMeetingResult.Value.AddDecision(decision);
            if (addDecisionResult.IsFailed)
                return Result.Fail("Add decision failed");

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
