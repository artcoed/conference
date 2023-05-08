using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Get
{
    public class GetMeetingsQueryHandler : IRequestHandler<GetMeetingsQuery, Result<IEnumerable<Meeting>>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetMeetingsQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<IEnumerable<Meeting>>> Handle(GetMeetingsQuery request, CancellationToken cancellationToken)
        {
            var getAllMeetingsResult = await _unitOfWork.MeetingsRepository.GetAll(cancellationToken);
            if (getAllMeetingsResult.IsFailed)
                return Result.Fail("Meetings not found");

            return Result.Ok(getAllMeetingsResult.Value);
        }
    }
}
