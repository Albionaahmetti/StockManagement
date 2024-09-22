using ReactApp1.Server.DTO;
using ReactApp1.Server.DTO.Stock;

namespace ReactApp1.Server.Interfaces
{
    public interface ISQLRepository
    {
        ApiResponse<IEnumerable<StockReport>> GetStock();
        ApiResponse<StockReport> GetStockWithIdStockEntry(int idStockEntry);

    }
}
