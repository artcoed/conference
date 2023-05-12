using FluentResults;
using MediatR;

namespace Conference.Commands.Users.CreateQuest
{
    public record CreateQuestUserCommand : IRequest<Result>
    {
        public string Login { get; init; }
        public string Password { get; init; }
    }
}
