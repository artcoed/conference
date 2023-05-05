using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetByInvited
{
    public record GetMeetingsByInvitedQuery : IRequest<Result<IEnumerable<Meeting>>>
    {
    }
}
