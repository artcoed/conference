using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Members
{
    public class CreateMemberCommandHandler : IRequestHandler<CreateMemberCommand, Result<int>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateMemberCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(CreateMemberCommand request, CancellationToken cancellationToken)
        {
            var id = await _unitOfWork.MembersRepository.Create(new Member(), cancellationToken);
            return Result.Ok(id);
        }
    }
}
