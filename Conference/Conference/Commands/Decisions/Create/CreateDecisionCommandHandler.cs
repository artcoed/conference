using Conference.Database.UnitOfWork;
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
            var meetingResult = await _unitOfWork.MeetingsRepository.GetByIdAsync(request.MeetingId, cancellationToken);
            if (meetingResult.IsFailed)
                return Result.Fail("Совещание не найдено");

            var meeting = meetingResult.Value;

            if (meeting.HasCompleted)
                return Result.Fail("Совещание уже было завершено");

            foreach (var a in meetingResult.Value.Decisions)
            {
                if (a.Value == request.Content)
                    return Result.Fail("Нельзя создать одинаковые решения");
            }

            meetingResult.Value.Decisions.Add(new Decision
            {
                Value = request.Content
            });

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
