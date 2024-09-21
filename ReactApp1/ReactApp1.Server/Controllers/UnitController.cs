using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Classes;
using ReactApp1.Server.DTO.UnitsDTO;
using ReactApp1.Server.Interfaces;

namespace ReactApp1.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UnitController : ControllerBase
    {
        private readonly IUnitService _unitService;
        private readonly ILogger<UnitController> _logger;
        public UnitController(ILogger<UnitController> logger, IUnitService unitService)
        {
            _logger = logger;
            _unitService = unitService;
        }

        [HttpPost("createUnit")]
        public IActionResult CreatePrdouct([FromForm] UnitDTO Unit) => Ok(_unitService.CreateUnit(Unit));

        [HttpGet("listAllUnits")]
        public IActionResult ListAllUnits() => Ok(_unitService.ListAllUnits());

        [HttpGet("getUnitById/{id}")]
        public IActionResult GetUnitById(int id) => Ok(_unitService.GetUnitById(id));

        [HttpPut("editUnit")]
        public IActionResult EditUnit([FromForm] UnitDTO Unit) => Ok(_unitService.EditUnit(Unit));

        [HttpPut("deleteUnit/{id}")]
        public IActionResult DeleteUnit(int id) => Ok( _unitService.DeleteUnit(id));

    }
}
