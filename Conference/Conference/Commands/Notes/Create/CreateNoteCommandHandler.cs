using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Notes.Create
{
    public class CreateNoteCommandHandler : IRequestHandler<CreateNoteCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateNoteCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateNoteCommand request, CancellationToken cancellationToken)
        {
            var meetingResult = await _unitOfWork.MeetingsRepository.GetById(request.MeetingId, cancellationToken);
            if (meetingResult.IsFailed)
                return Result.Fail("Совещание не найдено");

            meetingResult.Value.Notes.Add(new Note
            {
                Value = request.Content
            });

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
