using AutoMapper;
using ReactApp1.Server.Classes;
using ReactApp1.Server.DTO.ProductsDTO;
using ReactApp1.Server.DTO.Stock;
using ReactApp1.Server.DTO.UnitsDTO;

namespace ReactApp1.Server.ProfileMappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ProductDTO, Product>().ReverseMap();

            CreateMap<UnitDTO, Unit>().ReverseMap();
            CreateMap<StockEntryDTO, StockEntry>().ReverseMap()
                .ForMember(x => x.ProductName, opt => opt.MapFrom(src => src.IdProductNavigation.Name))
                .ForMember(x => x.DescriptionForStockOut, opt => opt.MapFrom(src => string.Concat(src.Description, " - ", src.IdProductNavigation.Name, " - ", src.Quantity)));

            CreateMap<StockOutDTO, StockOut>().ReverseMap()
                .ForMember(x => x.StockEntry, opt => opt.MapFrom(x => string.Concat(x.IdStockEntryNavigation.Description, " - " , x.IdStockEntryNavigation.IdProductNavigation.Name, " - ", x.IdStockEntryNavigation.Quantity)));
        }
    }
}
