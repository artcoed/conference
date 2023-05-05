using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Complete
{
    public class CompleteMeetingCommandHandler : IRequestHandler<CompleteMeetingCommand, Result>
    {
        public Task<Result> Handle(CompleteMeetingCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
