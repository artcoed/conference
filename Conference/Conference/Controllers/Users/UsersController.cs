using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Users
{
    public class UsersController : BaseController
    {
        /// <summary>
        /// Create user with quest role
        /// </summary>
        [HttpPost]
        public Task<IActionResult> CreateGuestAsync()
        {
            throw new NotImplementedException();
        }
    }
}
