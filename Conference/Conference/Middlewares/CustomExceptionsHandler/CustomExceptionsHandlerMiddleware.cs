using System.Net;

namespace Conference.Middlewares.CustomExceptionsHandler
{
    public class CustomExceptionsHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public CustomExceptionsHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (TaskCanceledException)
            {
                var code = HttpStatusCode.BadRequest;
                httpContext.Response.StatusCode = (int)code;
            }
        }
    }
}
