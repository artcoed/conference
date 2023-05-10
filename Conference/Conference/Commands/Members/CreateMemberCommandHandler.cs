using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Members
{
    public class CreateMemberCommandHandler : IRequestHandler<CreateMemberCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateMemberCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateMemberCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.MembersRepository.Create(new Member(request.Login), cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return Result.Ok();
        }
    }
}
