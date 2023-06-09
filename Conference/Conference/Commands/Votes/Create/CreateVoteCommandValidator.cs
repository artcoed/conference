﻿using FluentValidation;

namespace Conference.Commands.Votes.Create
{
    public class CreateVoteCommandValidator : AbstractValidator<CreateVoteCommand>
    {
        public CreateVoteCommandValidator()
        {
            RuleFor(x => x.OptionName)
                .NotEmpty()
                .Length(1, 50)
                .WithMessage("Длина варианта голосования должна быть от 1 до 50 символов");

            RuleFor(x => x.OptionName)
                .NotEmpty()
                .WithMessage("Вариант голосования не может быть пустым");
        }
    }
}
