using FluentValidation;

namespace Conference.Commands.Meetings.Create
{
    public class CreateMeetingCommandValidator : AbstractValidator<CreateMeetingCommand>
    {
        public CreateMeetingCommandValidator()
        {
            RuleFor(x => x.Questions)
                .Must(x => x != null)
                .Must(x => x.Count > 0)
                .ForEach(q =>
                    q.Length(2, 70));

            RuleFor(x => x.UsersId)
                .Must(x => x.Count > 0);
            
            RuleFor(x => x.Title)
                .Length(3, 50);
        }
    }
}
