namespace ReactApp1.Server.DTO.ProductsDTO
{
    public class ProductDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? FilePath { get; set; }
        public IFormFile? Document { get; set; }
    }
}
