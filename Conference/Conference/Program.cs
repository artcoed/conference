using Conference.Database;
using Conference.Database.Repository.Meetings;
using Conference.Database.Repository.Members;
using Conference.Middlewares.CustomExceptionsHandler;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Conference.Behavior;

var assemblies = AppDomain.CurrentDomain.GetAssemblies();

var builder = WebApplication.CreateBuilder(args);

{
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddMediatR(c =>
            c.RegisterServicesFromAssemblies(assemblies));

    builder.Services.AddValidatorsFromAssemblies(assemblies);
    builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

    builder.Services.AddDbContext<IEntityFrameworkContext, EntityFrameworkContext>(c =>
        c.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

    builder.Services.AddScoped<IMeetingsRepository, MeetingsEntityFrameworkRepository>();
    builder.Services.AddScoped<IMembersRepository, MembersEntityFrameworkRepository>();

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

    app.UseAuthorization();

    app.MapControllers();
}

app.Run();
