using Conference.Commands.Reports.GetByMeetingId;
using Conference.Database.UnitOfWork;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetById
{
    public class GetByIdMeetingQueryHandler : IRequestHandler<GetByIdMeetingQuery, Result<MeetingDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetByIdMeetingQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<MeetingDto>> Handle(GetByIdMeetingQuery request, CancellationToken cancellationToken)
        {
            var meetingResult = await _unitOfWork.MeetingsRepository.GetByIdAsync(request.MeetingId, cancellationToken);
            if (meetingResult.IsFailed)
                return Result.Fail("Совещание не найдено");

            var meeting = meetingResult.Value;

            if (meeting.HasCompleted == false)
                return Result.Fail("Совещание еще не завершено");

            var votes = new List<VoteDto>();
            foreach (var option in meeting.Options)
            {
                votes.Add(new VoteDto { Id = option.Id, Value = option.Value, Users = new List<User>() });
            }

            foreach (var vote in meeting.Votes)
            {
                foreach (var voteDto in votes)
                {
                    if (vote.Option.Id == voteDto.Id)
                    {
                        voteDto.Users.Add(vote.User);
                        vote.User.Meetings = new List<Meeting>();
                    }
                }
            }

            var meetingDto = new MeetingDto();

            var reportDto = new ReportDto
            {
                Id = request.MeetingId,
                MeetingTitle = meeting.Title,
                MeetingCompleted = meeting.HasCompleted,
                StartDateTime = meeting.StartDateTime,
                EndDateTime = meeting.EndDateTime,
                Decisions = meeting.Decisions.Select(x => x.Value).ToList(),
                Notes = meeting.Notes,
                Questions = meeting.Questions.Select(x => x.Value).ToList(),
                Users = meeting.Users,
                HasVoting = meeting.HasVoting,
                VotingTitle = meeting.VotingTitle,
                Votes = votes
            };

            foreach (var report in reportDto.Notes)
            {
                report.User.Meetings = new List<Meeting>();
            }

            foreach (var user in reportDto.Users)
            {
                user.Meetings = new List<Meeting>();
            }

            return Result.Ok(meetingDto);
        }
    }
}
