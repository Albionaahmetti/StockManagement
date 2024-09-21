using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Classes
{
    public class BaseEntity 
    {
        [Key] 
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime InsertionDate { get; set; }

    }
}
