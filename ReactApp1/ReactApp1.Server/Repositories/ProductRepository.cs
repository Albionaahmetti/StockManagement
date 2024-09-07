using ReactApp1.Server.Classes;
using ReactApp1.Server.Interfaces;

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
    }
}
