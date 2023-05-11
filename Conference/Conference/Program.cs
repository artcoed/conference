using Conference.Database;
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

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var assemblies = AppDomain.CurrentDomain.GetAssemblies();

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;

{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: MyAllowSpecificOrigins,
                          policy =>
                          {
                              policy.WithOrigins("http://127.0.0.1:7081",
                                              "http://localhost:7081",
                                              "https://localhost:7081",
                                              "https://127.0.0.1:7081",
                                              "*");
                          });
    });

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

    builder.Services.AddAuthorization();

    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddMediatR(c =>
            c.RegisterServicesFromAssemblies(assemblies));

    builder.Services.AddValidatorsFromAssemblies(assemblies);
    builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

    builder.Services.AddHttpContextAccessor();

    builder.Services.AddScoped<IUsersService, UsersService>();

    builder.Services.AddDbContext<IEntityFrameworkContext, EntityFrameworkContext>(c =>
        c.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

    builder.Services.AddScoped<IMeetingsRepository, MeetingsEntityFrameworkRepository>();
    builder.Services.AddScoped<IUsersRepository, UsersEntityFrameworkRepository>();

    builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
}

var app = builder.Build();

{
    app.UseCors(MyAllowSpecificOrigins);

    app.UseCustomExceptionsHandlerMiddleware();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
}

app.Run();
