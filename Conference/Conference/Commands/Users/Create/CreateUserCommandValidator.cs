using FluentValidation;

namespace Conference.Commands.Users.Create
{
    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        public CreateUserCommandValidator()
        {
            RuleFor(x => x.Login)
                .Length(3, 50);

            RuleFor(x => x.Password)
                .Length(3, 50);

            RuleFor(x => x.Name)
                .Length(3, 50);
        }
    }
}
