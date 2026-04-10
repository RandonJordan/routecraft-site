using Microsoft.EntityFrameworkCore;
using Routecraft.Api.Data;
using Routecraft.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// ===== CORS (config-driven) =====
var corsPolicyName = "RoutecraftCors";

// Read allowed origins from config first, fall back to sensible defaults
var configuredOrigins = builder.Configuration
    .GetSection("Cors:Origins")
    .Get<string[]>();

var defaultOrigins = new[]
{
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "https://brave-beach-0be2cb61e.6.azurestaticapps.net"
};

var allowedOrigins = (configuredOrigins is { Length: > 0 }) ? configuredOrigins : defaultOrigins;

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ===== DB =====
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("Default"));
});

// Swagger (dev)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
try { Directory.CreateDirectory("/home/site/wwwroot/App_Data"); } catch { }

// Apply EF Core migrations on startup (creates tables if missing)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}
// CORS must be before endpoints
app.UseCors(corsPolicyName);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ===== Endpoints =====

app.MapGet("/api/status", () => Results.Ok(new { ok = true, message = "API is running" }))
   .RequireCors(corsPolicyName);

app.MapPost("/api/contact", async (ContactRequest req, AppDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(req.Name) ||
        string.IsNullOrWhiteSpace(req.Phone) ||
        string.IsNullOrWhiteSpace(req.Message))
    {
        return Results.BadRequest(new { ok = false, error = "Name, phone, and message are required." });
    }

    if (req.Name.Length > 80) return Results.BadRequest(new { ok = false, error = "Name is too long." });
    if (req.Phone.Length > 30) return Results.BadRequest(new { ok = false, error = "Phone is too long." });
    if (req.Message.Length > 2000) return Results.BadRequest(new { ok = false, error = "Message is too long." });

    var msg = new ContactMessage
    {
        Name = req.Name.Trim(),
        Phone = req.Phone.Trim(),
        Message = req.Message.Trim(),
        CreatedUtc = DateTimeOffset.UtcNow
    };

    db.ContactMessages.Add(msg);
    await db.SaveChangesAsync();

    return Results.Ok(new { ok = true, message = "Message received." });
})
.RequireCors(corsPolicyName);

app.MapGet("/api/admin/messages", async (HttpRequest request, AppDbContext db, IConfiguration config) =>
{
    var expectedKey = config["Admin:ApiKey"];
    var providedKey = request.Headers["X-Admin-Key"].ToString();

    if (string.IsNullOrWhiteSpace(expectedKey) || providedKey != expectedKey)
    {
        return Results.Unauthorized();
    }

    var items = await db.ContactMessages
        .OrderByDescending(m => m.Id)
        .Take(50)
        .Select(m => new
        {
            m.Id,
            m.Name,
            m.Phone,
            m.Message,
            m.CreatedUtc
        })
        .ToListAsync();

    return Results.Ok(items);
})
.RequireCors(corsPolicyName);

app.Run();

// DTO
internal sealed class ContactRequest
{
    public string Name { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Message { get; set; } = "";
}