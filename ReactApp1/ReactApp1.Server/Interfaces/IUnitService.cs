using ReactApp1.Server.DTO;
using ReactApp1.Server.DTO.UnitsDTO;

namespace ReactApp1.Server.Interfaces
{
    public interface IUnitService
    {
        ApiResponse<IEnumerable<UnitDTO>> ListAllUnits();
        ApiResponse<UnitDTO> GetUnitById(int id);
        ApiResponse<UnitDTO> EditUnit(UnitDTO UnitDTO);
        ApiResponse<UnitDTO> CreateUnit(UnitDTO UnitDTO);
        ApiResponse<UnitDTO> DeleteUnit(int id);

    }
}
