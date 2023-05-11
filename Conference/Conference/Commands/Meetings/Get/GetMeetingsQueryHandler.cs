using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Get
{
    public class GetMeetingsQueryHandler : IRequestHandler<GetMeetingsQuery, Result<IReadOnlyList<Meeting>>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetMeetingsQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<IReadOnlyList<Meeting>>> Handle(GetMeetingsQuery request, CancellationToken cancellationToken)
        {
            var getAllMeetingsResult = await _unitOfWork.MeetingsRepository.GetAllAsync(cancellationToken);
            if (getAllMeetingsResult.IsFailed)
                return Result.Fail("Совещания не найдены");

            return Result.Ok(getAllMeetingsResult.Value);
        }
    }
}
