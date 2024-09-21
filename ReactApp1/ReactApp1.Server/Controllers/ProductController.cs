using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Classes;
using ReactApp1.Server.DTO.ProductsDTO;
using ReactApp1.Server.Interfaces;

namespace ReactApp1.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ILogger<ProductController> _logger;
        public ProductController(ILogger<ProductController> logger, IProductService productService)
        {
            _logger = logger;
            _productService = productService;
        }

        [HttpPost("createProduct")]
        public async Task<IActionResult> CreatePrdouct([FromForm] ProductDTO product) => Ok(await _productService.CreateProduct(product));

        [HttpGet("listAllProducts")]
        public IActionResult ListAllProducts() => Ok(_productService.ListAllProducts());

        [HttpGet("getProductById/{id}")]
        public IActionResult GetProductById(int id) => Ok(_productService.GetProductById(id));

        [HttpPut("editProduct")]
        public async Task<IActionResult> EditProduct([FromForm] ProductDTO product) => Ok(await _productService.EditProduct(product));

        [HttpPut("deleteProduct/{id}")]
        public IActionResult DeleteProduct(int id) => Ok( _productService.DeleteProduct(id));

    }
}
