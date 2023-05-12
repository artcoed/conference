using Conference.Database.UnitOfWork;
using Conference.Domain;
using Conference.Services.Roles;
using FluentResults;
using MediatR;

namespace Conference.Commands.Users.CreateQuest
{
    public class CreateQuestUserCommandHandler : IRequestHandler<CreateQuestUserCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateQuestUserCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateQuestUserCommand request, CancellationToken cancellationToken)
        {
            var existedUserResult = await _unitOfWork.UsersRepository.GetExistedByLoginAsync(request.Login, cancellationToken);
            if (existedUserResult.IsSuccess)
                return Result.Fail("Пользователь с таким логином уже существует");

            var questRoleResult = await _unitOfWork.RolesRepository.GetByName(RolesConstants.Quest, cancellationToken);
            if (questRoleResult.IsFailed)
                return Result.Fail("Ошибка создания пользователя");

            var user = new User
            {
                Login = request.Login,
                Password = request.Password,
                Role = questRoleResult.Value
            };

            await _unitOfWork.UsersRepository.AddAsync(user, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
