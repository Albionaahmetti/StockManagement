using AutoMapper;
using ReactApp1.Server.Classes;
using ReactApp1.Server.DTO;
using ReactApp1.Server.DTO.ProductsDTO;
using ReactApp1.Server.Enums;
using ReactApp1.Server.Helpers;
using ReactApp1.Server.Interfaces;

namespace ReactApp1.Server.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Product> _productRepository;
        private readonly IWebHostEnvironment _environment;
        private readonly FileService _fileService;

        public ProductService
        (
            IMapper mapper,
            IGenericRepository<Product> productRepository,
            IWebHostEnvironment environment,
            FileService fileService
        )
        {
            _mapper = mapper;
            _productRepository = productRepository;
            _environment = environment;
            _fileService = fileService;
        }

        public ApiResponse<IEnumerable<ProductDTO>> ListAllProducts()
        {
            try
            {
                var data = _productRepository.FindByCriteria(_ => !_.IsDeleted);
                return new ApiResponse<IEnumerable<ProductDTO>>((int)PublicStatusCode.Done, _mapper.Map<IList<ProductDTO>>(_productRepository.FindByCriteria(_ => !_.IsDeleted)));
            }
            catch (Exception)
            {
                return new ApiResponse<IEnumerable<ProductDTO>>((int)PublicStatusCode.InternalServerError);
            }
        }

        public ApiResponse<ProductDTO> GetProductById(int id)
        {
            try
            {
                var product = _productRepository.GetById(id);
                return new ApiResponse<ProductDTO>((int)PublicStatusCode.Done, _mapper.Map<ProductDTO>(product));
            }
            catch (Exception)
            {
                return new ApiResponse<ProductDTO>((int)PublicStatusCode.InternalServerError);
            }
        }

        public async Task<ApiResponse<ProductDTO>> EditProduct(ProductDTO productDTO)
        {
            try
            {
                var product = _productRepository.GetById(productDTO.Id.Value);
                product.Name = productDTO.Name;
            
                  
                _productRepository.Update(product);

                return new ApiResponse<ProductDTO>((int)PublicStatusCode.Done, _mapper.Map<ProductDTO>(product));

            }
            catch (Exception)
            {
                return new ApiResponse<ProductDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
        public ApiResponse<ProductDTO> DeleteProduct(int id)
        {
            try
            {
                var product = _productRepository.GetById(id);
                product.IsDeleted = true;
              
                _productRepository.Update(product);
                return new ApiResponse<ProductDTO>((int)PublicStatusCode.Done, _mapper.Map<ProductDTO>(product));
            }
            catch (Exception)
            {
                return new ApiResponse<ProductDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
        public async Task<ApiResponse<ProductDTO>> CreateProduct(ProductDTO productDTO)
        {
            try
            {
               
                 

                var product = _mapper.Map(productDTO, new Product() {});
                product.InsertionDate = DateTime.Now;
                _productRepository.Add(product);

                return new ApiResponse<ProductDTO>((int)PublicStatusCode.Done, _mapper.Map<ProductDTO>(product));
            }
            catch (Exception)
            {
                return new ApiResponse<ProductDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
        
    }
}
