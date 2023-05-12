using FluentValidation;

namespace Conference.Commands.Users.CreateQuest
{
    public class CreateQuestUserCommandValidator : AbstractValidator<CreateQuestUserCommand>
    {
        public CreateQuestUserCommandValidator()
        {
            RuleFor(x => x.Login)
                .Length(3, 50);

            RuleFor(x => x.Password)
                .Length(3, 50);
        }
    }
}
