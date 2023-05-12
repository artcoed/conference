using Conference.Database.UnitOfWork;
using Conference.Domain;
using FluentResults;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Conference.Services.Users
{
    public class UsersService : IUsersService
    {
        private const string UserIdClaim = "userid";
        private const string TokenSecret = "*RasjajduehfyqweUHFuihashfuiasnfjk12390@@$W(#U#HRNF#";
        private static readonly TimeSpan TokenLifeTime = TimeSpan.FromHours(8);

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUnitOfWork _unitOfWork;

        public UsersService(IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork)
        {
            _httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<User>> GetCurrentUser(CancellationToken cancellationToken)
        {
            var suspectId = _httpContextAccessor.HttpContext.User.FindFirstValue(UserIdClaim);
            await Console.Out.WriteLineAsync(suspectId);
            if (suspectId == null)
                return Result.Fail("Неудачная попытка аунтефикации");


            if (int.TryParse(suspectId, out var id) == false)
                return Result.Fail("Неудачная попытка аунтефикации");

            await Console.Out.WriteLineAsync(id.ToString());

            var userResult = await _unitOfWork.UsersRepository.GetByIdAsync(id, cancellationToken);
            if (userResult.IsFailed)
                return Result.Fail("Неудачная попытка аунтефикации");

            await Console.Out.WriteLineAsync(userResult.IsSuccess.ToString());

            return Result.Ok(userResult.Value);
        }

        public string GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new (JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new (UserIdClaim, user.Id.ToString()),
                new (ClaimTypes.Role, user.Role.Name)
            };

            var key = Encoding.UTF8.GetBytes(TokenSecret);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(TokenLifeTime),
                Issuer = "Author",
                Audience = "Audience",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return jwt;
        }
    }
}
