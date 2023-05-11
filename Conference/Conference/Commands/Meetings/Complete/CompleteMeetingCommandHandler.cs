using Conference.Database;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Complete
{
    public class CompleteMeetingCommandHandler : IRequestHandler<CompleteMeetingCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CompleteMeetingCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CompleteMeetingCommand request, CancellationToken cancellationToken)
        {
            return Result.Ok();
        }
    }
}
