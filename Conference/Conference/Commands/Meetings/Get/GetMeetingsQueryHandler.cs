using Conference.Database.UnitOfWork;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Get
{
    public class GetMeetingsQueryHandler : IRequestHandler<GetMeetingsQuery, Result<IReadOnlyList<MeetingDto>>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetMeetingsQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<IReadOnlyList<MeetingDto>>> Handle(GetMeetingsQuery request, CancellationToken cancellationToken)
        {
            var getAllMeetingsResult = await _unitOfWork.MeetingsRepository.GetAllAsync(cancellationToken);
            if (getAllMeetingsResult.IsFailed)
                return Result.Fail("Совещания не найдены");

            IReadOnlyList<MeetingDto> meetings = getAllMeetingsResult.Value.Select(x => new MeetingDto
            {
                Id = x.Id,
                MeetingTitle = x.Title,
                StartDateTime = x.StartDateTime,
                HasCompleted = x.HasCompleted,
                EndDateTime = x.EndDateTime,
            }).ToList();

            return Result.Ok(meetings);
        }
    }
}
