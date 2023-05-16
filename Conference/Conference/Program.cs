using Conference.Database.Repository.Meetings;
using Conference.Middlewares.CustomExceptionsHandler;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Conference.Behavior;
using Conference.Services.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Conference.Database.Repository.Users;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;
using Conference.Swagger;
using Conference.Database.UnitOfWork;
using Conference.Database.EntityFramework;
using Conference.Services.Roles;
using Conference.Database.Repository.Roles;
using System.Text.Json.Serialization;
using Conference.Database.Repository.Notifications;
using System.Security.Claims;
using Microsoft.AspNetCore.Cors.Infrastructure;

const string corsPolicy = "CorsPolicy";

var assemblies = AppDomain.CurrentDomain.GetAssemblies();

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;

{
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(x
            => x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = config["JwtSettings:Issuer"],
                ValidAudience = config["JwtSettings:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["JwtSettings:Key"])),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true
            });

    builder.Services.AddCors(options =>
    {
        options.AddPolicy(corsPolicy,
            builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
    });

    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy(RolesConstants.Administrator, builder =>
        {
            builder.RequireRole(RolesConstants.Administrator);
        });

        options.AddPolicy(RolesConstants.Secretary, builder =>
        {
            builder.RequireRole(RolesConstants.Secretary);
        });
   
        options.AddPolicy(RolesConstants.Worker, builder =>
        {
            builder.RequireRole(RolesConstants.Worker);
        });

        options.AddPolicy(RolesConstants.Quest, builder =>
        {

            builder.RequireAssertion(x => x.User.HasClaim(ClaimTypes.Role, RolesConstants.Worker) ||
                                        x.User.HasClaim(ClaimTypes.Role, RolesConstants.Quest));
        });
    });

    builder.Services.AddControllers()
        .AddJsonOptions(configure =>
        {
            configure.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            configure.JsonSerializerOptions.WriteIndented = true;
        });

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

    builder.Services.AddMediatR(c =>
            c.RegisterServicesFromAssemblies(assemblies));

    builder.Services.AddValidatorsFromAssemblies(assemblies);
    builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

    builder.Services.AddHttpContextAccessor();

    builder.Services.AddScoped<IUsersService, UsersService>();

    builder.Services.AddDbContext<IEntityFrameworkContext, EntityFrameworkContext>(c =>
        c.UseSqlServer(builder.Configuration
            .GetConnectionString("DefaultConnection")));

    builder.Services.AddScoped<IMeetingsRepository, MeetingsEntityFrameworkRepository>();
    builder.Services.AddScoped<IUsersRepository, UsersEntityFrameworkRepository>();
    builder.Services.AddScoped<IRolesRepository, RolesEntityFrameworkRepository>();
    builder.Services.AddScoped<INotificationsRepository, NotificationsEntityFrameworkRepository>();

    builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
}
 
var app = builder.Build();

{

    app.UseCustomExceptionsHandlerMiddleware();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthentication();
    
    app.UseCors(corsPolicy);

    app.UseAuthorization();

    app.MapControllers();
}

app.Run();
