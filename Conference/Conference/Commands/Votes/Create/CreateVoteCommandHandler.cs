using FluentResults;
using MediatR;

namespace Conference.Commands.Votes.Create
{
    public class CreateVoteCommandHandler : IRequestHandler<CreateVoteCommand, Result>
    {
        public Task<Result> Handle(CreateVoteCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
