//using AutoMapper;
//using Microsoft.IdentityModel.Tokens;
//using ReactApp1.Server.Classes;
//using ReactApp1.Server.DTO.ProductsDTO;
//using ReactApp1.Server.DTO.Stock;

//namespace ReactApp1.Server.NewFolder
//{
//    public class PathResolver
//    {
//        public class ProductFilePathResolver : IValueResolver<Product, ProductDTO, string>
//        {
//            private readonly IConfiguration _configuration;
//            public ProductFilePathResolver(IConfiguration configuration) => _configuration = configuration;
                

//            public string Resolve(Product source, ProductDTO destination, string destMember, ResolutionContext context)
//            {
//                if (string.IsNullOrEmpty(source.FilePath))
//                    return string.Empty;

//                var baseUrl = _configuration["Backend:BaseUrl"];
//                var relativePath = Path.Combine(source.FilePath).Replace("\\", "/");
//                return $"{baseUrl.TrimEnd('/')}/{relativePath}";
//            }
//        }
//        public class StockEntryFilePathResolver : IValueResolver<StockEntry, StockEntryDTO, string>
//        {
//            private readonly IConfiguration _configuration;
//            public StockEntryFilePathResolver(IConfiguration configuration) => _configuration = configuration;
//            public string Resolve(StockEntry source, StockEntryDTO destination, string destMember, ResolutionContext context)
//            {
//                var product = source.IdProductNavigation;
//                if (string.IsNullOrEmpty(product?.FilePath))
//                    return string.Empty;

//                var baseUrl = _configuration["Backend:BaseUrl"];

//                var relativePath = Path.Combine(product.FilePath).Replace("\\", "/");
//                return $"{baseUrl.TrimEnd('/')}/{relativePath}";
//            }
//        }
//        public class StockOutFilePathResolver : IValueResolver<StockOut, StockOutDTO, string>
//        {
//            private readonly IConfiguration _configuration;
//            public StockOutFilePathResolver(IConfiguration configuration) => _configuration = configuration;

//            public string Resolve(StockOut source, StockOutDTO destination, string destMember, ResolutionContext context)
//            {
         

//                var baseUrl = _configuration["Backend:BaseUrl"];

//                var relativePath = Path.Combine(product.FilePath).Replace("\\", "/");
//                return $"{baseUrl.TrimEnd('/')}/{relativePath}";
//            }
//        }
//    }
//}
