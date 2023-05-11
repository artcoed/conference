using FluentValidation;

namespace Conference.Commands.Votings.Create
{
    public class CreateVotingCommandValidator : AbstractValidator<CreateVotingCommand>
    {
        public CreateVotingCommandValidator()
        {
            RuleFor(x => x.Title)
                .Length(3, 100);

            RuleFor(x => x.Options)
                .Must(x => x.Count() > 1)
                .ForEach(o =>
                    o.Length(1, 50));
        }
    }
}
