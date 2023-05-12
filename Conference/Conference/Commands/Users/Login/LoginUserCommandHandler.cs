using Conference.Database.UnitOfWork;
using Conference.Services.Users;
using FluentResults;
using MediatR;

namespace Conference.Commands.Users.Login
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, Result<LoginDataDto>>
    {
        private readonly IUsersService _usersService;
        private readonly IUnitOfWork _unitOfWork;

        public LoginUserCommandHandler(IUsersService usersService, IUnitOfWork unitOfWork)
        {
            _usersService = usersService;
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<LoginDataDto>> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var userResult = await _unitOfWork.UsersRepository.GetExistedByLoginAndPasswordAsync(request.Login, request.Password, cancellationToken);
            if (userResult.IsFailed)
                return Result.Fail("Пользователя с таким логином или паролем не существует");

            var token = _usersService.GenerateToken(userResult.Value);
            var loginDataDto = new LoginDataDto
            {
                Token = token,
                Role = userResult.Value.Role.Name
            };

            return Result.Ok(loginDataDto);
        }
    }
}
