using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers.Meetings
{
    public class VotingsController : BaseController
    {
        /// <summary>
        /// Create new voting
        /// </summary>
        [HttpPost]
        public Task<IActionResult> CreateVotingAsync()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Vote in voting
        /// </summary>
        [HttpPost]
        public Task<IActionResult> VoteAsync()
        {
            throw new NotImplementedException();
        }
    }
}
