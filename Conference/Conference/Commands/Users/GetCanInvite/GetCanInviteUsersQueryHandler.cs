using Conference.Commands.Users.Get;
using Conference.Database.UnitOfWork;
using Conference.Services.Roles;
using FluentResults;
using MediatR;

namespace Conference.Commands.Users.GetCanInvite
{
    public class GetCanInviteUsersQueryHandler : IRequestHandler<GetCanInviteUsersQuery, Result<IReadOnlyList<UserDto>>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetCanInviteUsersQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<IReadOnlyList<UserDto>>> Handle(GetCanInviteUsersQuery request, CancellationToken cancellationToken)
        {
            var getUsers = await _unitOfWork.UsersRepository.GetExistedAll(cancellationToken);
            if (getUsers.IsFailed)
                return Result.Fail("Пользователи не найдены");

            IReadOnlyList<UserDto> users = getUsers.Value.Where(x => x.Role.Name == RolesConstants.Worker
            || x.Role.Name == RolesConstants.Quest)
                .Select(user => new UserDto
            {
                Id = user.Id,
                Login = user.Login,
                Name = user.DisplayingName,
                Role = user.Role.RussianName,
            }).ToList();

            return Result.Ok(users);
        }
    }
}
