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
            return Result.Ok();
        }
    }
}
