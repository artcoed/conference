using FluentResults;
using MediatR;

namespace Conference.Commands.Decisions.Create
{
    public class CreateDecisionCommandHandler : IRequestHandler<CreateDecisionCommand, Result>
    {
        public Task<Result> Handle(CreateDecisionCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
