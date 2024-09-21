using ReactApp1.Server.DTO.ProductsDTO;
using ReactApp1.Server.DTO;
using ReactApp1.Server.DTO.Stock;

namespace ReactApp1.Server.Interfaces
{
    public interface IStockEntryService
    {
        ApiResponse<IEnumerable<StockEntryDTO>> ListAllStockEntries();
        ApiResponse<StockEntryDTO> GetStockEntryById(int id);
        ApiResponse<StockEntryDTO> EditStockEntry(StockEntryDTO productDTO);
        ApiResponse<StockEntryDTO> CreateStockEntry(StockEntryDTO productDTO);
        ApiResponse<StockEntryDTO> DeleteStockEntry(int id);
    }
}
