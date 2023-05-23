using FluentValidation;

namespace Conference.Commands.Users.Login
{
    public class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
    {
        public LoginUserCommandValidator()
        {
            RuleFor(x => x.Login)
                .Length(3, 50)
                .WithMessage("Длина логина должна быть от 3 до 50 символов");

            RuleFor(x => x.Login)
                .NotEmpty()
                .WithMessage("Логин не может быть пустым");

            RuleFor(x => x.Password)
                .Length(3, 50)
                .WithMessage("Длина пароля должна быть от 3 до 50 символов");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Пароль не может быть пустым");
        }
    }
}
