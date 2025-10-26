using Microsoft.AspNetCore.Mvc;
using Next.Backend.Models;
using Next.Backend.Services.Interfaces;

namespace Next.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService  _productService;
    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var data = await _productService.GetAll();
            if (!data.Any())
                return NoContent();
            
            return Ok(data);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error on fetching products: {ex.Message}");
        }
    }
}