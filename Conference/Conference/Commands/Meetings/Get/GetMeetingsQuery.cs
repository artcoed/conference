using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Get
{
    public record GetMeetingsQuery : IRequest<Result<IReadOnlyList<Meeting>>>
    {
    }
}
