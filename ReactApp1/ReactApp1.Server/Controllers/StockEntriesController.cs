using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Classes;
using ReactApp1.Server.DTO.Stock;
using ReactApp1.Server.DTO.UnitsDTO;
using ReactApp1.Server.Interfaces;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockEntriesController : ControllerBase
    {
        private readonly IStockEntryService _stockEntriesService;
        private readonly ILogger<StockEntriesController> _logger;
        public StockEntriesController(ILogger<StockEntriesController> logger, IStockEntryService stockEntriesService)
        {
            _logger = logger;
            _stockEntriesService = stockEntriesService;
        }

        [HttpPost("createStockEntry")]
        public IActionResult CreateStockEntry([FromForm] StockEntryDTO stockEntry) => Ok(_stockEntriesService.CreateStockEntry(stockEntry));

        [HttpGet("listAllStockEntries")]
        public IActionResult ListAllStockEntries() => Ok(_stockEntriesService.ListAllStockEntries());

        [HttpGet("getStockEntryById/{id}")]
        public IActionResult GetStockEntryById(int id) => Ok(_stockEntriesService.GetStockEntryById(id));

        [HttpPut("editStockEntry")]
        public IActionResult EditStockEntry([FromForm] StockEntryDTO stockEntry) => Ok(_stockEntriesService.EditStockEntry(stockEntry));

        [HttpPut("deleteStockEntry/{id}")]
        public IActionResult DeleteStockEntry(int id) => Ok( _stockEntriesService.DeleteStockEntry(id));

    }
}
