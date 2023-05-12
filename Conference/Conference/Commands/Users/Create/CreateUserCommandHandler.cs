using Conference.Database.UnitOfWork;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Users.Create
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateUserCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var existedUserResult = await _unitOfWork.UsersRepository.GetByLoginAsync(request.Login, cancellationToken);
            if (existedUserResult.IsSuccess)
                return Result.Fail("Пользователь с таким логином уже существует");

            var user = new User
            {
                Login = request.Login,
                Password = request.Password,
            };

            await _unitOfWork.UsersRepository.AddAsync(user, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
