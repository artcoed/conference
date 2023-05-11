using Conference.Domain;
using FluentValidation;

namespace Conference.Commands.Notes.Create
{
    public class CreateNoteCommandValidator : AbstractValidator<CreateNoteCommand>
    {
        public CreateNoteCommandValidator()
        {
        }
    }
}
