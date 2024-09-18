using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Classes;
using ReactApp1.Server.Interfaces;
using System.Linq;

namespace ReactApp1.Server.Repositories
{
    public class ProductRepository:IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
                _context = context;
        }
        public async Task Add(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Product>> GetAll()
        {
            var result =await _context.Products.ToListAsync();
            return result;
        }
    }
}
