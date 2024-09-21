using AutoMapper;
using ReactApp1.Server.Classes;
using ReactApp1.Server.DTO.ProductsDTO;
using ReactApp1.Server.DTO.Stock;
using ReactApp1.Server.DTO.UnitsDTO;
using static ReactApp1.Server.NewFolder.PathResolver;

namespace ReactApp1.Server.ProfileMappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ProductDTO, Product>().ReverseMap()
                .ForMember(x => x.FilePath, opt => opt.MapFrom<ProductFilePathResolver>());

            CreateMap<UnitDTO, Unit>().ReverseMap();
            CreateMap<StockEntryDTO, StockEntry>().ReverseMap()
                .ForMember(x => x.ProductName, opt => opt.MapFrom(src => src.IdProductNavigation.Name))
                .ForMember(x => x.ProductImagePath, opt => opt.MapFrom<StockEntryFilePathResolver>());


            CreateMap<StockOutDTO, StockOut>().ReverseMap()
                .ForMember(x => x.ProductImageFromStockEntry, opt => opt.MapFrom<StockOutFilePathResolver>());
        }
    }
}
