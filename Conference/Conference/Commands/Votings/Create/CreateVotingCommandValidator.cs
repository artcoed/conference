using Conference.Domain;
using FluentValidation;

namespace Conference.Commands.Votings.Create
{
    public class CreateVotingCommandValidator : AbstractValidator<CreateVotingCommand>
    {
        public CreateVotingCommandValidator()
        {
        }
    }
}
