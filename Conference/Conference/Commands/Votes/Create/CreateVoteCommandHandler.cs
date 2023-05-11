using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Votes.Create
{
    public class CreateVoteCommandHandler : IRequestHandler<CreateVoteCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateVoteCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateVoteCommand request, CancellationToken cancellationToken)
        {
            return Result.Ok();
        }
    }
}
