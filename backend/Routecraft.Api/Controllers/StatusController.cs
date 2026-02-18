using Microsoft.AspNetCore.Mvc;

namespace Routecraft.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatusController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            ok = true,
            service = "Routecraft.Api",
            message = "API is running",
            utc = DateTime.UtcNow
        });
    }
}
