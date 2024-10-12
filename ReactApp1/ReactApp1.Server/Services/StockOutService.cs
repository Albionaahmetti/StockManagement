using AutoMapper;
using ReactApp1.Server.Classes;
using ReactApp1.Server.DTO;
using ReactApp1.Server.DTO.Stock;
using ReactApp1.Server.Enums;
using ReactApp1.Server.Helpers;
using ReactApp1.Server.Interfaces;

namespace ReactApp1.Server.Services
{
    public class StockOutService : IStockOutService
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<StockOut> _stockOutRepository;
        private readonly ISQLRepository _sQLRepository;
        private readonly IWebHostEnvironment _environment;
        private readonly FileService _fileService;

        public StockOutService
        (
            IMapper mapper,
            IGenericRepository<StockOut> stockOutRepository,
            ISQLRepository sQLRepository,
            IWebHostEnvironment environment,
            FileService fileService
        )
        {
            _mapper = mapper;
            _stockOutRepository = stockOutRepository;
            _environment = environment;
            _sQLRepository = sQLRepository;
            _fileService = fileService;
        }

        public ApiResponse<IEnumerable<StockOutDTO>> ListAllStockOut()
        {
            try
            {
                var data = _stockOutRepository.FindByCriteria(_ => !_.IsDeleted, _ => _.IdStockEntryNavigation, _ => _.IdStockEntryNavigation.IdProductNavigation);
                return new ApiResponse<IEnumerable<StockOutDTO>>((int)PublicStatusCode.Done, _mapper.Map<IList<StockOutDTO>>(data));
            }
            catch (Exception)
            {
                return new ApiResponse<IEnumerable<StockOutDTO>>((int)PublicStatusCode.InternalServerError);
            }
        }

        public ApiResponse<StockOutDTO> GetStockOutById(int id)
        {
            try
            {
                var stockOut = _stockOutRepository.GetByIdWithNavigations(id, _ => _.IdStockEntryNavigation.IdProductNavigation);
                return new ApiResponse<StockOutDTO>((int)PublicStatusCode.Done, _mapper.Map<StockOutDTO>(_mapper.Map<StockOutDTO>(_stockOutRepository.GetByIdWithNavigations(id, _ => _.IdStockEntryNavigation.IdProductNavigation))));
            }
            catch (Exception)
            {
                return new ApiResponse<StockOutDTO>((int)PublicStatusCode.InternalServerError);
            }
        }

        public ApiResponse<StockOutDTO> EditStockOut(StockOutDTO StockOutDTO)
        {
            try
            {
                var stockOut = _stockOutRepository.GetById(StockOutDTO.Id.Value);
                _mapper.Map(StockOutDTO, stockOut);
                _stockOutRepository.Update(stockOut);
                return new ApiResponse<StockOutDTO>((int)PublicStatusCode.Done, _mapper.Map<StockOutDTO>(_mapper.Map<StockOutDTO>(_stockOutRepository.GetByIdWithNavigations(stockOut.Id, _ => _.IdStockEntryNavigation.IdProductNavigation))));
            }
            catch (Exception)
            {
                return new ApiResponse<StockOutDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
        public ApiResponse<StockOutDTO> DeleteStockOut(int id)
        {
            try
            {
                var stockOut = _stockOutRepository.GetById(id);
                stockOut.IsDeleted = true;
                _stockOutRepository.Update(stockOut);
                return new ApiResponse<StockOutDTO>((int)PublicStatusCode.Done, _mapper.Map<StockOutDTO>(_stockOutRepository.GetByIdWithNavigations(id, _ => _.IdStockEntryNavigation.IdProductNavigation)));
            }
            catch (Exception)
            {
                return new ApiResponse<StockOutDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
        public ApiResponse<StockOutDTO> CreateStockOut(StockOutDTO StockOutDTO)
        {
            try
            {
                var stockOut = _mapper.Map(StockOutDTO, new StockOut() { InsertionDate = DateTime.Now });
                //var stock = _sQLRepository.GetStockWithIdStockEntry(stockOut.IDStockEntry);
                //if (stock.Result != null ? stock.Result.RemainingStock < stockOut.Quantity : true)
                //    return new ApiResponse<StockOutDTO>((int)PublicStatusCode.NotEnoughQuantity);

                var inserted = _stockOutRepository.AddAndGetEntity(stockOut);
                return new ApiResponse<StockOutDTO>((int)PublicStatusCode.Done, _mapper.Map<StockOutDTO>(_stockOutRepository.GetByIdWithNavigations(inserted.Id, _ => _.IdStockEntryNavigation.IdProductNavigation)));
            }
            catch (Exception)
            {
                return new ApiResponse<StockOutDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
        public ApiResponse<IEnumerable<StockReport>> GetStock()
        {
            try
            {
                var stockOut = _sQLRepository.GetStock();
                return stockOut;
            }
            catch (Exception)
            {
                return new ApiResponse<IEnumerable<StockReport>>((int)PublicStatusCode.InternalServerError);
            }
        }

    }
}
