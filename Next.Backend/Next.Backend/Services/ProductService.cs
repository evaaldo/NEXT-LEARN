using System.Data;
using Dapper;
using Next.Backend.Models;
using Next.Backend.Services.Interfaces;

namespace Next.Backend.Services;

public class ProductService : IProductService
{
    private readonly IDbConnection _dbConnection;
    public ProductService(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }
    
    public async Task<IEnumerable<Product>> GetAll()
    {
        var sql = @"SELECT * FROM products";
        var data = await _dbConnection.QueryAsync<Product>(sql);
        return data;
    }
}