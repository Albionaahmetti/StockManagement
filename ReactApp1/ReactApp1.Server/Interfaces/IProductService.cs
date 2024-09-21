using ReactApp1.Server.DTO;
using ReactApp1.Server.DTO.ProductsDTO;

namespace ReactApp1.Server.Interfaces
{
    public interface IProductService
    {
        ApiResponse<IEnumerable<ProductDTO>> ListAllProducts();
        ApiResponse<ProductDTO> GetProductById(int id);
        Task<ApiResponse<ProductDTO>>  EditProduct(ProductDTO productDTO);
        Task<ApiResponse<ProductDTO>> CreateProduct(ProductDTO productDTO);
        ApiResponse<ProductDTO> DeleteProduct(int id);

    }
}
