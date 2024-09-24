using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Classes
{
    public class Product : BaseEntity
    {
        public Product() => StockEntries = new HashSet<StockEntry>();
        public string? Name { get; set; }
        public virtual ICollection<StockEntry> StockEntries { get; set; } 
    }
}
