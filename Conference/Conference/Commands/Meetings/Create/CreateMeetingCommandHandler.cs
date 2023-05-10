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
            var getMembersResult = await _unitOfWork.MembersRepository.GetMembersByLogin(request.MembersLogins, cancellationToken);
            if (getMembersResult.IsFailed)
                return Result.Fail("One or more members not found");

            var members = getMembersResult.Value.ToList();

            var questions = new List<Question>(request.Questions.Select(x => Question.Create(x).Value));
            var documents = new List<Document>(request.Documents.Select(x => Document.Create(x).Value));

            var meeting = new Meeting(request.StartMeetingTime, questions, documents, members);

            await _unitOfWork.MeetingsRepository.Create(meeting, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
