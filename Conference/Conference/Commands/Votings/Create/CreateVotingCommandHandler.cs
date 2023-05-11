using Conference.Database;
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
            return Result.Ok();
        }
    }
}
