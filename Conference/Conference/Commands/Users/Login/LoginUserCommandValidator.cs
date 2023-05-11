using FluentValidation;

namespace Conference.Commands.Users.Login
{
    public class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
    {
        public LoginUserCommandValidator()
        {
            RuleFor(x => x.Login)
                .Length(3, 50);

            RuleFor(x => x.Password)
                .Length(3, 50);
        }
    }
}
