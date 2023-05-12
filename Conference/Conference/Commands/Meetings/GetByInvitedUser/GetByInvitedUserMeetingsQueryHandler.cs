using Conference.Database.UnitOfWork;
using Conference.Domain;
using Conference.Services.Users;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetByInvitedUser
{
    public class GetByInvitedUserMeetingsQueryHandler : IRequestHandler<GetByInvitedUserMeetingsQuery, Result<IReadOnlyList<Meeting>>>
    {
        private readonly IUsersService _usersService;
        private readonly IUnitOfWork _unitOfWork;

        public GetByInvitedUserMeetingsQueryHandler(IUsersService usersService, IUnitOfWork unitOfWork)
        {
            _usersService = usersService;
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<IReadOnlyList<Meeting>>> Handle(GetByInvitedUserMeetingsQuery request, CancellationToken cancellationToken)
        {
            var userResult = await _usersService.GetCurrentUser(cancellationToken);
            if (userResult.IsFailed)
                return Result.Fail("Ошибка аутентификации");

            var meetingsResult = await _unitOfWork.MeetingsRepository.GetByInvitedUserAsync(userResult.Value.Id, cancellationToken);
            if (meetingsResult.IsFailed)
                return Result.Fail(meetingsResult.Errors);

            IReadOnlyList<Meeting> meetings = meetingsResult.Value;

            return Result.Ok(meetings);
        }
    }
}
