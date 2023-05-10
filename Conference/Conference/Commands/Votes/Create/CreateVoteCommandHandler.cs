using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Votes.Create
{
    public class CreateVoteCommandHandler : IRequestHandler<CreateVoteCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateVoteCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateVoteCommand request, CancellationToken cancellationToken)
        {
            var getMeetingResult = await _unitOfWork.MeetingsRepository.GetById(request.MeetingId, cancellationToken);
            if (getMeetingResult.IsFailed)
                return Result.Fail("Meeting not found");

            var getMemberResult = await _unitOfWork.MembersRepository.GetMemberByLogin(request.MemberLogin, cancellationToken);
            if (getMemberResult.IsFailed)
                return Result.Fail("Member not found");

            var needOption = Option.Create(request.OptionName).Value;
            foreach (var option in getMeetingResult.Value.Votes)
            {
                if (option.Value == request.OptionName)
                {
                    needOption = option;
                }
            }

            var voteResult = getMeetingResult.Value.Vote(needOption, getMemberResult.Value);
            if (voteResult.IsFailed)
                return Result.Fail("Vote option not found");

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
