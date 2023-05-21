using FluentValidation;

namespace Conference.Commands.Users.CreateQuest
{
    public class CreateQuestUserCommandValidator : AbstractValidator<CreateQuestUserCommand>
    {
        public CreateQuestUserCommandValidator()
        {
            RuleFor(x => x.Login)
                .Length(3, 50)
                .WithMessage("Длина логина должна быть от 3 до 50 символов");

            RuleFor(x => x.Password)
                .Length(3, 50)
                .WithMessage("Длина пароля должна быть от 3 до 50 символов");

            RuleFor(x => x.Name)
                .Length(3, 50)
                .WithMessage("Длина имени должна быть от 3 до 50 символов");
        }
    }
}
