using System.ComponentModel.DataAnnotations;

namespace Routecraft.Api.Models;

public sealed class ContactMessage
{
    public int Id { get; set; }

    [MaxLength(80)]
    public string Name { get; set; } = "";

    [MaxLength(30)]
    public string Phone { get; set; } = "";

    [MaxLength(2000)]
    public string Message { get; set; } = "";

    public DateTimeOffset CreatedUtc { get; set; } = DateTimeOffset.UtcNow;
}
