using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Notifications.GetMeetingsInvation
{
    public class GetMeetingsInvationNotificationsQueryHandler : IRequestHandler<GetMeetingsInvationNotificationsQuery, Result<IEnumerable<Notification>>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetMeetingsInvationNotificationsQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<IEnumerable<Notification>>> Handle(GetMeetingsInvationNotificationsQuery request, CancellationToken cancellationToken)
        {
            var getMemberResult = await _unitOfWork.MembersRepository.GetMemberById(request.UserId, cancellationToken);
            if (getMemberResult.IsFailed)
                return Result.Fail("Member not found");

            IEnumerable<Notification> notifications = getMemberResult.Value.Notifications;

            return Result.Ok(notifications);
        }
    }
}
