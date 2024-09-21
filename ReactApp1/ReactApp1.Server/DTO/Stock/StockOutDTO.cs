namespace ReactApp1.Server.DTO.Stock
{
    public class StockOutDTO
    {
        public int? Id { get; set; }
        public int IDStockEntry { get; set; }
        public string? StockEntry { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public string? ProductImageFromStockEntry { get; set; }
        public DateTime? InsertionDate { get; set; }

    }
}
