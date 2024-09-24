using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp1.Server.Classes
{
    public class StockEntry : BaseEntity
    {
        public StockEntry () => StockOuts = new HashSet<StockOut>(); 
        public string? Description { get; set; }
        public int IDProduct { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }

        [ForeignKey(nameof(IDProduct))]
        public virtual Product? IdProductNavigation { get;set; }

        public virtual ICollection<StockOut> StockOuts { get; set; }

    }
}
