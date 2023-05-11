using FluentValidation;

namespace Conference.Commands.Notes.Create
{
    public class CreateNoteCommandValidator : AbstractValidator<CreateNoteCommand>
    {
        public CreateNoteCommandValidator()
        {
            RuleFor(x => x.Content)
                .Length(2, 100);
        }
    }
}
