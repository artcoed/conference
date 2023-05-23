using FluentValidation;

namespace Conference.Commands.Decisions.Create
{
    public class CreateDecisionCommandValidator : AbstractValidator<CreateDecisionCommand>
    {
        public CreateDecisionCommandValidator()
        {
            RuleFor(x => x.Content)
                .NotEmpty()
                .WithMessage("Решение не может быть пустым");

            RuleFor(x => x.Content)
                .Length(2, 100)
                .WithMessage("Длина решения должна быть от 2 до 100 символов");
        }
    }
}
