using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetByInvited
{
    public class GetMeetingsByInvitedQueryHandler : IRequestHandler<GetMeetingsByInvitedQuery, Result<IEnumerable<Meeting>>>
    {
        public Task<Result<IEnumerable<Meeting>>> Handle(GetMeetingsByInvitedQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
