using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Classes;
using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Repositories;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
        [Route("api/[controller]")]

    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly ILogger<ProductController> _logger;
        public ProductController(IProductRepository productRepository, ILogger<ProductController> logger)
        {
            _productRepository = productRepository;
            _logger = logger;
        }

        [HttpPost(Name = "Add")]

        public async Task<string> Add(Product product)
        {
             await _productRepository.Add(product);
            return ("Hama katin");
        }


        [HttpGet]
        [Route("GetAll", Name = "GetAll")]
        public async Task<IEnumerable<Product>> GetAll()
        {
            var result =await _productRepository.GetAll();
            return (result);
        }

    }
}
