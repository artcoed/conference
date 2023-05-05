using FluentResults;
using MediatR;

namespace Conference.Commands.Notes.Create
{
    public class CreateNoteCommandHandler : IRequestHandler<CreateNoteCommand, Result>
    {
        public Task<Result> Handle(CreateNoteCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
