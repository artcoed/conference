using Conference.Database.UnitOfWork;
using Conference.Domain;
using Conference.Services.Roles;
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
            var existedUserResult = await _unitOfWork.UsersRepository.GetExistedByLoginAsync(request.Login, cancellationToken);
            if (existedUserResult.IsSuccess)
                return Result.Fail("Пользователь с таким логином уже существует");

            var roleResult = await _unitOfWork.RolesRepository.GetByName(request.Role, cancellationToken);
            if (roleResult.IsFailed)
                return Result.Fail("Роль указана неверно");

            var user = new User
            {
                DisplayingName = request.DisplayingName,
                Login = request.Login,
                Password = request.Password,
                Role = roleResult.Value
            };

            await _unitOfWork.UsersRepository.AddAsync(user, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
