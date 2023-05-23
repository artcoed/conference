using Conference.Database.UnitOfWork;
using FluentResults;
using MediatR;

namespace Conference.Commands.Users.Get
{
    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, Result<IReadOnlyList<UserDto>>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetUsersQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<IReadOnlyList<UserDto>>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var getUsers = await _unitOfWork.UsersRepository.GetExistedAll(cancellationToken);
            if (getUsers.IsFailed)
                return Result.Fail("Пользователи не найдены");

            IReadOnlyList<UserDto> users = getUsers.Value.Select(user => new UserDto { 
                Id = user.Id,
                Login = user.Login,
                DisplayingName = user.DisplayingName,
                Role = user.Role.RussianName,
            }).ToList();

            return Result.Ok(users);
        }
    }
}
