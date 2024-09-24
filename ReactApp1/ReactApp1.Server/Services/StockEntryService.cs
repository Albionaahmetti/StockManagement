using AutoMapper;
using ReactApp1.Server.Classes;
using ReactApp1.Server.DTO;
using ReactApp1.Server.DTO.Stock;
using ReactApp1.Server.DTO.UnitsDTO;
using ReactApp1.Server.Enums;
using ReactApp1.Server.Helpers;
using ReactApp1.Server.Interfaces;

namespace ReactApp1.Server.Services
{
    public class StockEntryService : IStockEntryService
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<StockEntry> _stockEntryRepository;
        private readonly IWebHostEnvironment _environment;
        private readonly FileService _fileService;

        public StockEntryService
        (
            IMapper mapper,
            IGenericRepository<StockEntry> stockEntryRepository,
            IWebHostEnvironment environment,
            FileService fileService
        )
        {
            _mapper = mapper;
            _stockEntryRepository = stockEntryRepository;
            _environment = environment;
            _fileService = fileService;
        }

        public ApiResponse<IEnumerable<StockEntryDTO>> ListAllStockEntries()
        {
            try
            {
                IEnumerable<StockEntry>? data = _stockEntryRepository.GetAllWithNavigations(_ => _.IdProductNavigation);
                return new ApiResponse<IEnumerable<StockEntryDTO>>((int)PublicStatusCode.Done, _mapper.Map<IList<StockEntryDTO>>(_stockEntryRepository.FindByCriteria(_ => !_.IsDeleted)));
            }
            catch (Exception)
            {
                return new ApiResponse<IEnumerable<StockEntryDTO>>((int)PublicStatusCode.InternalServerError);
            }
        }

        public ApiResponse<StockEntryDTO> GetStockEntryById(int id)
        {
            try
            {
                var stockEntry = _stockEntryRepository.GetByIdWithNavigations(id, _ => _.IdProductNavigation);
                return new ApiResponse<StockEntryDTO>((int)PublicStatusCode.Done, _mapper.Map<StockEntryDTO>(stockEntry));
            }
            catch (Exception)
            {
                return new ApiResponse<StockEntryDTO>((int)PublicStatusCode.InternalServerError);
            }
        }

        public ApiResponse<StockEntryDTO> EditStockEntry(StockEntryDTO StockEntryDTO)
        {
            try
            {
                var stockEntry = _stockEntryRepository.GetById(StockEntryDTO.Id.Value);
                _mapper.Map(stockEntry, stockEntry);
                _stockEntryRepository.Update(stockEntry);
                return new ApiResponse<StockEntryDTO>((int)PublicStatusCode.Done, _mapper.Map<StockEntryDTO>(stockEntry));
            }
            catch (Exception)
            {
                return new ApiResponse<StockEntryDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
        public ApiResponse<StockEntryDTO> DeleteStockEntry(int id)
        {
            try
            {
                var stockEntry = _stockEntryRepository.GetById(id);
                stockEntry.IsDeleted = true;
                _stockEntryRepository.Update(stockEntry);
                return new ApiResponse<StockEntryDTO>((int)PublicStatusCode.Done, _mapper.Map<StockEntryDTO>(stockEntry));
            }
            catch (Exception)
            {
                return new ApiResponse<StockEntryDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
        public ApiResponse<StockEntryDTO> CreateStockEntry(StockEntryDTO StockEntryDTO)
        {
            try
            {
                var stockEntry = _mapper.Map(StockEntryDTO, new StockEntry());
                    stockEntry.InsertionDate = DateTime.Now;
                _stockEntryRepository.Add(stockEntry);
                return new ApiResponse<StockEntryDTO>((int)PublicStatusCode.Done, _mapper.Map<StockEntryDTO>(stockEntry));
            }
            catch (Exception)
            {
                return new ApiResponse<StockEntryDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
    }
}
