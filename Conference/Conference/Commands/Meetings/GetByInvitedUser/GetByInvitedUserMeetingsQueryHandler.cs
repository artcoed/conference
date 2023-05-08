using Conference.Database;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.GetByInvitedUser
{
    public class GetByInvitedUserMeetingsQueryHandler : IRequestHandler<GetByInvitedUserMeetingsQuery, Result<IEnumerable<Meeting>>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetByInvitedUserMeetingsQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<IEnumerable<Meeting>>> Handle(GetByInvitedUserMeetingsQuery request, CancellationToken cancellationToken)
        {
            var getByInvitedUserMeetingsResult = await _unitOfWork.MeetingsRepository.GetByInvitedUser(request.UserId, cancellationToken);
            if (getByInvitedUserMeetingsResult.IsFailed)
                return Result.Fail("Meetings not found");

            return Result.Ok(getByInvitedUserMeetingsResult.Value);
        }
    }
}
