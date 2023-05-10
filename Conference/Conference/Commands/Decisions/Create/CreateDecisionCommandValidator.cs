using Conference.Domain;
using Conference.FluentValidationExtensions;
using FluentValidation;

namespace Conference.Commands.Decisions.Create
{
    public class CreateDecisionCommandValidator : AbstractValidator<CreateDecisionCommand>
    {
        public CreateDecisionCommandValidator()
        {
            RuleFor(x => x.Content)
                .CanCreate(Decision.Create);
        }
    }
}
