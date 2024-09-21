using AutoMapper;
using ReactApp1.Server.Classes;
using ReactApp1.Server.DTO.ProductsDTO;
using ReactApp1.Server.DTO.Stock;

namespace ReactApp1.Server.NewFolder
{
    public class PathResolver
    {
        public class ProductFilePathResolver : IValueResolver<Product, ProductDTO, string>
        {
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly IWebHostEnvironment _environment;

            public ProductFilePathResolver(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment environment)
            {
                _httpContextAccessor = httpContextAccessor;
                _environment = environment;
            }

            public string Resolve(Product source, ProductDTO destination, string destMember, ResolutionContext context)
            {
                if (string.IsNullOrEmpty(source.FilePath))
                    return string.Empty;

                var request = _httpContextAccessor.HttpContext?.Request;
                var baseUrl = $"{request?.Scheme}://{request?.Host}";

                var relativePath = Path.Combine(source.FilePath).Replace("\\", "/");
                return $"{baseUrl.TrimEnd('/')}/{relativePath}";
            }
        }
        public class StockEntryFilePathResolver : IValueResolver<StockEntry, StockEntryDTO, string>
        {
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly IWebHostEnvironment _environment;

            public StockEntryFilePathResolver(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment environment)
            {
                _httpContextAccessor = httpContextAccessor;
                _environment = environment;
            }

            public string Resolve(StockEntry source, StockEntryDTO destination, string destMember, ResolutionContext context)
            {
                var product = source.IdProductNavigation;
                if (string.IsNullOrEmpty(product?.FilePath))
                    return string.Empty;

                var request = _httpContextAccessor.HttpContext?.Request;
                var baseUrl = $"{request?.Scheme}://{request?.Host}";

                var relativePath = Path.Combine(product.FilePath).Replace("\\", "/");
                return $"{baseUrl.TrimEnd('/')}/{relativePath}";
            }
        }
        public class StockOutFilePathResolver : IValueResolver<StockOut, StockOutDTO, string>
        {
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly IWebHostEnvironment _environment;

            public StockOutFilePathResolver(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment environment)
            {
                _httpContextAccessor = httpContextAccessor;
                _environment = environment;
            }

            public string Resolve(StockOut source, StockOutDTO destination, string destMember, ResolutionContext context)
            {
                var product = source.IdStockEntryNavigation != null ?  source.IdStockEntryNavigation.IdProductNavigation : new Product() { FilePath = string.Empty};
                if (string.IsNullOrEmpty(product?.FilePath))
                    return string.Empty;

                var request = _httpContextAccessor.HttpContext?.Request;
                var baseUrl = $"{request?.Scheme}://{request?.Host}";

                var relativePath = Path.Combine(product.FilePath).Replace("\\", "/");
                return $"{baseUrl.TrimEnd('/')}/{relativePath}";
            }
        }
    }
}
