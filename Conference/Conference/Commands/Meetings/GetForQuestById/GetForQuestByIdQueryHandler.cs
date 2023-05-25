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
            var userResult = await _usersService.GetCurrentUser(cancellationToken);
            if (userResult.IsFailed)
                return Result.Fail("Ошибка аутентификации");

            var user = userResult.Value;
            
            var meetingResult = await _unitOfWork.MeetingsRepository.GetByIdForQuestAsync(request.MeetingId, user, cancellationToken);
            if (meetingResult.IsFailed)
                return Result.Fail("Совещание не найдено");

            var meeting = meetingResult.Value;

            bool hasVoted = false;
            string selectedOption = "";
            foreach (var vote in meeting.Votes)
            {
                if (vote.User == user)
                {
                    hasVoted = true;
                    selectedOption = vote.Option.Value;
                    break;
                }
            }

            var notes = meeting.Notes.Where(x => x.User == user)
                .Select(x => x.Value)
                .ToList();

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
