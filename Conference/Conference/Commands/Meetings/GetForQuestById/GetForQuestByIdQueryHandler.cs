using Conference.Database.UnitOfWork;
using Conference.Services.Users;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetForQuestById
{
    public class GetForQuestByIdQueryHandler : IRequestHandler<GetForQuestByIdQuery, Result<QuestMeetingDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUsersService _usersService;

        public GetForQuestByIdQueryHandler(IUnitOfWork unitOfWork, IUsersService usersService)
        {
            _unitOfWork = unitOfWork;
            _usersService = usersService;
        }

        public async Task<Result<QuestMeetingDto>> Handle(GetForQuestByIdQuery request, CancellationToken cancellationToken)
        {
            var meetingResult = await _unitOfWork.MeetingsRepository.GetByIdAsync(request.MeetingId, cancellationToken);
            if (meetingResult.IsFailed)
                return Result.Fail("Совещание не найдено");

            var userResult = await _usersService.GetCurrentUser(cancellationToken);
            if (userResult.IsFailed)
                return Result.Fail("Ошибка аутентификации");

            var meeting = meetingResult.Value;
            var user = userResult.Value;

            if (!meeting.Users.Contains(user))
                return Result.Fail("Пользователь не приглашен на это совещание");

            bool hasVoted = false;
            string selectedOption = "";
            foreach (var vote in meeting.Votes)
            {
                if (vote.User ==  user)
                {
                    hasVoted = true;
                    selectedOption = vote.Option.Value;
                    break;
                }
            }

            var notes = meeting.Notes.Where(x => x.User == user).Select(x => x.Value).ToList();

            var meetingDto = new QuestMeetingDto
            {
                Id = meeting.Id,
                HasCompleted = meeting.HasCompleted,
                HasVoting = meeting.HasVoting,
                MeetingTitle = meeting.MeetingTitle,
                VotingTitle = meeting.VotingTitle,
                Notes = notes,
                VotingOptions = meeting.Options.Select(x => x.Value).ToList(),
                Documents = meeting.Documents.Select(x => new QuestDocumentDto { Id = x.Id, Name = x.Name }).ToList(),
                HasVoted = hasVoted,
                SelectedOption = selectedOption,
                Questions = meeting.Questions.Select(x => x.Value).ToList()
            };

            return Result.Ok(meetingDto);
        }
    }
}
