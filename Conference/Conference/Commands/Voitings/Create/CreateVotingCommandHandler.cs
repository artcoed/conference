using FluentResults;
using MediatR;

namespace Conference.Commands.Voitings.Create
{
    public class CreateVotingCommandHandler : IRequestHandler<CreateVotingCommand, Result>
    {
        public Task<Result> Handle(CreateVotingCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
