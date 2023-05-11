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
            return Result.Ok();
        }
    }
}
