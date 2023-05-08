namespace Conference.Middlewares.CustomExceptionsHandler
{
    public static class CustomExceptionsHandlerMiddlewareExtensions
    {
        public static IApplicationBuilder UseCustomExceptionsHandlerMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomExceptionsHandlerMiddleware>();
        }
    }
}
