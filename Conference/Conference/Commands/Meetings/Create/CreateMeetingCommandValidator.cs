using FluentValidation;

namespace Conference.Commands.Meetings.Create
{
    public class CreateMeetingCommandValidator : AbstractValidator<CreateMeetingCommand>
    {
        public CreateMeetingCommandValidator()
        {
            RuleFor(x => x.Questions)
                .Must(x => x.Count > 0)
                .WithMessage("У совещания должен быть минимум один вопрос");

            RuleFor(x => x.Questions)
                .Must(x => x != null)
                .WithMessage("У совещания должен быть минимум один вопрос");

            RuleFor(x => x.Questions)
                .ForEach(q =>
                    q.Length(2, 70))
                .WithMessage("Вопросы должны быть длиной от 2 до 70 символов"); ;

            RuleFor(x => x.UsersId)
                .Must(x => x.Count > 0)
                .WithMessage("На совещание должен быть приглашен минимум 1 пользователь");
            
            RuleFor(x => x.Title)
                .Length(3, 50)
                .WithMessage("Тема совещания должна быть длиной от 3 до 50 символов");
        }
    }
}
