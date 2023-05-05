using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Get
{
    public class GetMeetingsQueryHandler : IRequestHandler<GetMeetingsQuery, Result<IEnumerable<Meeting>>>
    {
        public Task<Result<IEnumerable<Meeting>>> Handle(GetMeetingsQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
