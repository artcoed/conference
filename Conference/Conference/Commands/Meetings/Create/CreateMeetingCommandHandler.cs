using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Create
{
    public class CreateMeetingCommandHandler : IRequestHandler<CreateMeetingCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateMeetingCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateMeetingCommand request, CancellationToken cancellationToken)
        {
            return Result.Ok();
        }
    }
}
