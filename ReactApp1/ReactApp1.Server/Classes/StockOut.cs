using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp1.Server.Classes
{
    public class StockOut : BaseEntity
    {
        public int IDStockEntry { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }

        [ForeignKey(nameof(IDStockEntry))]
        public virtual StockEntry? IdStockEntryNavigation { get; set; }

    }
}
