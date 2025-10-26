using Next.Backend.Models;

namespace Next.Backend.Services.Interfaces;

public interface IProductService
{
    public Task<IEnumerable<Product>> GetAll();
}