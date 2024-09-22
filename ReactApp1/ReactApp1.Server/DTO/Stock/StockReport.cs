namespace ReactApp1.Server.DTO.Stock
{

    public class StockReport
    {
        public string? ProductName { get; set; }
        public decimal TotalStock { get; set; }
        public decimal TotalOut { get; set; }
        public decimal RemainingStock { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal TotalProfit { get; set; }
    }
}
