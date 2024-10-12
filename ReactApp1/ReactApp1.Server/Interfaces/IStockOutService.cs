using ReactApp1.Server.DTO.Stock;
using ReactApp1.Server.DTO;

namespace ReactApp1.Server.Interfaces
{
    public interface IStockOutService
    {
        ApiResponse<IEnumerable<StockOutDTO>> ListAllStockOut();
        ApiResponse<StockOutDTO> GetStockOutById(int id);
        ApiResponse<IEnumerable<StockReport>> GetStock();
        ApiResponse<StockOutDTO> EditStockOut(StockOutDTO productDTO);
        ApiResponse<StockOutDTO> CreateStockOut(StockOutDTO productDTO);
        ApiResponse<StockOutDTO> DeleteStockOut(int id);
    }
}
