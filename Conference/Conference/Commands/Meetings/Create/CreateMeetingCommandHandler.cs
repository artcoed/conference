using Conference.Database.UnitOfWork;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Meetings.Create
{
    public class CreateMeetingCommandHandler : IRequestHandler<CreateMeetingCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateMeetingCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateMeetingCommand request, CancellationToken cancellationToken)
        {
            if (request.UsersId.Count != request.UsersId.ToList().Distinct().Count())
                return Result.Fail("Один или более пользователей переданы повторно");

            var invitedUsersResult = await _unitOfWork.UsersRepository.GetByIdAsync(request.UsersId, cancellationToken);
            if (invitedUsersResult.IsFailed)
                return Result.Fail("Как минимум один из пользователей не существует");

            var users = invitedUsersResult.Value.ToList();
            var meeting = new Meeting
            {
                StartDate = request.StartMeetingDateTime.Date,
                StartTime = request.StartMeetingDateTime.TimeOfDay,
                Questions = request.Questions.Select(x => new Question { Value = x }).ToList(),
                Documents = request.Documents.Select(x => new Document { Value = x }).ToList(),
                Users = users
            };

            foreach (var user in users)
            {
                var notification = new Notification
                {
                    Meeting = meeting,
                    User = user
                };

                await _unitOfWork.NotificationsRepository.AddAsync(notification, cancellationToken);
            }

            await _unitOfWork.MeetingsRepository.AddAsync(meeting, cancellationToken);

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }
}
