using API.Helpers;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.DependencyInjection;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        var connectionString = configuration.GetConnectionString("Sqlite");

        builder.Services.AddScoped<IDbConnection>((sp) =>
        {
            return new SqliteConnection(connectionString);
        });

        // Configuración del filtro de servicio para validar el token JWT en los controladores
        builder.Services.AddScoped<AuthorizationFilter>();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins",
                builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
        });

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        // Middleware de autenticación y autorización
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseCors("AllowAllOrigins");

        app.MapControllers();

        app.Run();
    }
}
