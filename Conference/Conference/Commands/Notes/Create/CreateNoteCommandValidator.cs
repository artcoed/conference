using Conference.Domain;
using Conference.FluentValidationExtensions;
using FluentValidation;

namespace Conference.Commands.Notes.Create
{
    public class CreateNoteCommandValidator : AbstractValidator<CreateNoteCommand>
    {
        public CreateNoteCommandValidator()
        {
            RuleFor(x => x.Content)
                .CanCreate(Note.Create);
        }
    }
}
