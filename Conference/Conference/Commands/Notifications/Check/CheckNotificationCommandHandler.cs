using Conference.Database.UnitOfWork;
using Conference.Services.Users;
using FluentResults;
using MediatR;

namespace Conference.Commands.Notifications.Check
{
    public class CheckNotificationCommandHandler : IRequestHandler<CheckNotificationCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUsersService _usersService;

        public CheckNotificationCommandHandler(IUnitOfWork unitOfWork, IUsersService usersService)
        {
            _unitOfWork = unitOfWork;
            _usersService = usersService;
        }

        public async Task<Result> Handle(CheckNotificationCommand request, CancellationToken cancellationToken)
        {
            var notificationResult = await _unitOfWork.NotificationsRepository.GetById(request.NotificationId, cancellationToken);
            if (notificationResult.IsFailed)
                return Result.Fail(notificationResult.Errors);

            var notification = notificationResult.Value;

            if (notification.IsChecked)
                return Result.Fail("Уведомление уже было просмотрено");

            var userResult = await _usersService.GetCurrentUser(cancellationToken);
            if (userResult.IsFailed)
                return Result.Fail("Ошибка аутентификации");

            if (userResult.Value != notification.User)
                return Result.Fail("Пользователь не может просматривать данное уведомление");

            notification.IsChecked = true;

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
