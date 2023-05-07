using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace Conference.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BaseController : ControllerBase
    {
        protected IActionResult ConvertToActionResult<T>(Result<T> result)
        {
            if (result.IsFailed)
                return BadRequest(result.Reasons);

            return Ok(result.Value);
        }

        protected IActionResult ConvertToActionResult(Result result) 
        {
            if (result.IsFailed)
                return BadRequest(result.Reasons);

            return Ok();
        }
    }
}
