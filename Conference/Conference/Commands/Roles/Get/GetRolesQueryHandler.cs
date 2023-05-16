using Conference.Database.UnitOfWork;
using Conference.Domain;
using FluentResults;
using MediatR;

namespace Conference.Commands.Roles.Get
{
    public class GetRolesQueryHandler : IRequestHandler<GetRolesQuery, Result<IReadOnlyList<Role>>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetRolesQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<IReadOnlyList<Role>>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
        {
            var getResult = await _unitOfWork.RolesRepository.GetAll(cancellationToken);
            if (getResult.IsFailed)
                return Result.Fail("Ролей не существует");

            IReadOnlyList<Role> roles = getResult.Value;

            return Result.Ok(roles);
        }
    }
}
