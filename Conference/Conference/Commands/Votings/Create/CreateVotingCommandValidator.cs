using FluentValidation;

namespace Conference.Commands.Votings.Create
{
    public class CreateVotingCommandValidator : AbstractValidator<CreateVotingCommand>
    {
        public CreateVotingCommandValidator()
        {
            RuleFor(x => x.Title)
                .Length(3, 100)
                .WithMessage("Длина заголовка голосования должна быть от 3 до 100 символов"); ;

            RuleFor(x => x.Title)
                .NotEmpty()
                .WithMessage("Заголовок голосования не может быть пустым");

            RuleFor(x => x.Options)
                .Must(x => x.Count > 1)
                .WithMessage("Должен присутствовать минимум 1 вариант голосования");
            
            RuleFor(x => x.Options)
                .ForEach(o =>
                    o.Length(1, 50))
                .WithMessage("Длина варианта голосования должна быть от 1 до 50 символов");
        }
    }
}
