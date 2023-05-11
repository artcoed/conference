using Conference.Domain;
using FluentValidation;

namespace Conference.Commands.Decisions.Create
{
    public class CreateDecisionCommandValidator : AbstractValidator<CreateDecisionCommand>
    {
        public CreateDecisionCommandValidator()
        {
        }
    }
}
