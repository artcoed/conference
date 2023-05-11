using Conference.Domain;
using FluentValidation;

namespace Conference.Commands.Meetings.Create
{
    public class CreateMeetingCommandValidator : AbstractValidator<CreateMeetingCommand>
    {
        public CreateMeetingCommandValidator()
        {
        }
    }
}
