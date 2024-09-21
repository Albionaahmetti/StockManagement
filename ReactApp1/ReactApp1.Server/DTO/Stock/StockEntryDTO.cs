namespace ReactApp1.Server.DTO.Stock
{
    public class StockEntryDTO
    {
        public int? Id { get; set; }
        public string? Description { get; set; }
        public int IDProduct { get; set; }
        public int IDUnit { get; set; }
        public string? ProductImagePath { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public string? ProductName { get; set; }
        public DateTime? InsertionDate { get; set; }

    }
}
