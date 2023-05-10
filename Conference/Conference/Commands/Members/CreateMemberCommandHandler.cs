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
            var existedUser = await _unitOfWork.MembersRepository.GetMemberByLogin(request.Login, cancellationToken);
            if (existedUser.IsSuccess)
                return Result.Fail("Member arleady existed");

            var member = new Member(request.Login);

            await _unitOfWork.MembersRepository.Create(member, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return Result.Ok();
        }
    }
}
