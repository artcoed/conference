using Conference.Domain;
using Conference.Services.Users;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetByInvitedUser
{
    public class GetByInvitedUserMeetingsQueryHandler : IRequestHandler<GetByInvitedUserMeetingsQuery, Result<IReadOnlyList<Meeting>>>
    {
        private readonly IUsersService _usersService;

        public GetByInvitedUserMeetingsQueryHandler(IUsersService usersService)
        {
            _usersService = usersService;
        }

        public async Task<Result<IReadOnlyList<Meeting>>> Handle(GetByInvitedUserMeetingsQuery request, CancellationToken cancellationToken)
        {
            var userResult = await _usersService.GetCurrentUser(cancellationToken);
            if (userResult.IsFailed)
                return Result.Fail("Ошибка аутентификации");

            return Result.Ok(userResult.Value.Meetings);
        }
    }
}
