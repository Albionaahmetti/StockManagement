using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Classes
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? FilePath { get; set; }
        public DateTime InsertionDate { get; set; }
    }
}
