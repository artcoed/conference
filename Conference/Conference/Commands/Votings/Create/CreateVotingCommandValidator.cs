using Conference.Domain;
using Conference.FluentValidationExtensions;
using FluentValidation;

namespace Conference.Commands.Votings.Create
{
    public class CreateVotingCommandValidator : AbstractValidator<CreateVotingCommand>
    {
        public CreateVotingCommandValidator()
        {
            RuleFor(x => x.Title)
                .CanCreate(VotingTitle.Create);

            RuleFor(x => x.Options)
                .ForEach(x => x.CanCreate(Option.Create));
        }
    }
}
