using Microsoft.EntityFrameworkCore;
using Routecraft.Api.Data;
using Routecraft.Api.Models;
using Routecraft.Api.Data;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("Default"));
});

var corsPolicyName = "AllowViteDev";

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors(corsPolicyName);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



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
});

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
});


app.Run();

internal sealed class ContactRequest
{
    public string Name { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Message { get; set; } = "";
}

