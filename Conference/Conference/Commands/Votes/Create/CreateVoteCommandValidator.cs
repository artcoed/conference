using Conference.Domain;
using FluentValidation;

namespace Conference.Commands.Votes.Create
{
    public class CreateVoteCommandValidator : AbstractValidator<CreateVoteCommand>
    {
        public CreateVoteCommandValidator()
        {
        }
    }
}
