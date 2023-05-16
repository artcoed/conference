using Conference.Database.UnitOfWork;
using FluentResults;
using MediatR;

namespace Conference.Commands.Users.Delete
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteUserCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var userResult = await _unitOfWork.UsersRepository.GetByIdAsync(request.UserId, cancellationToken);
            if (userResult.IsFailed)
                return Result.Fail("Пользователя не существует");

            var user = userResult.Value;
            if (user.IsDeleted)
                return Result.Fail("Пользователь уже удален");

            user.IsDeleted = true;

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
