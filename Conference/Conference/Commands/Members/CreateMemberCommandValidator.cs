using FluentValidation;

namespace Conference.Commands.Members
{
    public class CreateMemberCommandValidator : AbstractValidator<CreateMemberCommand>
    {
        public CreateMemberCommandValidator()
        {
            RuleFor(x => x.Login)
                .MinimumLength(3)
                .MaximumLength(20);
        }
    }
}
