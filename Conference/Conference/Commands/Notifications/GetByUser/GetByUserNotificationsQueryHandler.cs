using Conference.Database.UnitOfWork;
using Conference.Domain;
using Conference.Services.Users;
using FluentResults;
using MediatR;

namespace Conference.Commands.Notifications.GetByUser
{
    public class GetByUserNotificationsQueryHandler : IRequestHandler<GetByUserNotificationsQuery, Result<IReadOnlyList<Notification>>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUsersService _usersService;

        public GetByUserNotificationsQueryHandler(IUnitOfWork unitOfWork, IUsersService usersService)
        {
            _unitOfWork = unitOfWork;
            _usersService = usersService;
        }

        public async Task<Result<IReadOnlyList<Notification>>> Handle(GetByUserNotificationsQuery request, CancellationToken cancellationToken)
        {
            var userResult = await _usersService.GetCurrentUser(cancellationToken);
            if (userResult.IsFailed)
                return Result.Fail("Ошибка аутентификации");

            var user = userResult.Value;

            var notificationsResult = await _unitOfWork.NotificationsRepository.GetByUser(user, cancellationToken);
            if (notificationsResult.IsFailed)
                return Result.Fail(notificationsResult.Errors);

            var notifications = notificationsResult.Value;

            return Result.Ok(notifications);
        }
    }
}
