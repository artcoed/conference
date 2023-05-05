using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Create
{
    public class CreateMeetingCommandHandler : IRequestHandler<CreateMeetingCommand, Result>
    {
        public Task<Result> Handle(CreateMeetingCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
