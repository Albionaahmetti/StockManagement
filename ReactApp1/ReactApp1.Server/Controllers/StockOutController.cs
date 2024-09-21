using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Classes;
using ReactApp1.Server.DTO.Stock;
using ReactApp1.Server.DTO.UnitsDTO;
using ReactApp1.Server.Interfaces;

namespace ReactApp1.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StockOutController : ControllerBase
    {
        private readonly IStockOutService _stockOutService;
        private readonly ILogger<StockOutController> _logger;
        public StockOutController(ILogger<StockOutController> logger, IStockOutService stockOutService)
        {
            _logger = logger;
            _stockOutService = stockOutService;
        }

        [HttpPost("createStockOut")]
        public IActionResult CreateStockOut([FromForm] StockOutDTO stockOut) => Ok(_stockOutService.CreateStockOut(stockOut));

        [HttpGet("listAllStockOut")]
        public IActionResult ListAllStockOut() => Ok(_stockOutService.ListAllStockOut());

        [HttpGet("getStockOutById/{id}")]
        public IActionResult GetStockOutById(int id) => Ok(_stockOutService.GetStockOutById(id));

        [HttpPut("editStockOut")]
        public IActionResult EditStockOut([FromForm] StockOutDTO stockOut) => Ok(_stockOutService.EditStockOut(stockOut));

        [HttpPut("deleteStockOut/{id}")]
        public IActionResult DeleteStockOut(int id) => Ok( _stockOutService.DeleteStockOut(id));

    }
}
