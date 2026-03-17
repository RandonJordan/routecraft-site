using Microsoft.EntityFrameworkCore;
using Routecraft.Api.Models;

namespace Routecraft.Api.Data;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
}