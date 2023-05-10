using Conference.Domain;
using Conference.FluentValidationExtensions;
using FluentValidation;

namespace Conference.Commands.Votes.Create
{
    public class CreateVoteCommandValidator : AbstractValidator<CreateVoteCommand>
    {
        public CreateVoteCommandValidator()
        {
            RuleFor(x => x.OptionName)
                .CanCreate(Option.Create);
        }
    }
}
