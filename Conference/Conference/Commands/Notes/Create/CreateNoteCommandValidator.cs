using FluentValidation;

namespace Conference.Commands.Notes.Create
{
    public class CreateNoteCommandValidator : AbstractValidator<CreateNoteCommand>
    {
        public CreateNoteCommandValidator()
        {
            RuleFor(x => x.Content)
                .Length(2, 100)
                .WithMessage("Длина заметки должна быть от 2 до 100 символов");

            RuleFor(x => x.Content)
                .NotEmpty()
                .WithMessage("Заметка не может быть пустой");
        }
    }
}
