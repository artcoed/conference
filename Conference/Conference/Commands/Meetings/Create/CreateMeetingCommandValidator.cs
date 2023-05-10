using Conference.Domain;
using Conference.FluentValidationExtensions;
using FluentValidation;

namespace Conference.Commands.Meetings.Create
{
    public class CreateMeetingCommandValidator : AbstractValidator<CreateMeetingCommand>
    {
        public CreateMeetingCommandValidator()
        {
            RuleFor(x => x.StartMeetingTime).Must(x => x > DateTime.Now);

            RuleFor(x => x.Questions)
                .ForEach(x => x.CanCreate(Question.Create));

            RuleFor(x => x.Documents)
                .ForEach(x => x.CanCreate(Document.Create));
        }
    }
}
