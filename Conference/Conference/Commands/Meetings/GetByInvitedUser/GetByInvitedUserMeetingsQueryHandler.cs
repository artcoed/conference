using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetByInvitedUser
{
    public class GetByInvitedUserMeetingsQueryHandler : IRequestHandler<GetByInvitedUserMeetingsQuery, Result<IEnumerable<Meeting>>>
    {
        public Task<Result<IEnumerable<Meeting>>> Handle(GetByInvitedUserMeetingsQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
