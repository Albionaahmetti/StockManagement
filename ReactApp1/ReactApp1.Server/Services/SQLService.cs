using AutoMapper;
using Microsoft.Data.SqlClient;
using ReactApp1.Server.DTO;
using ReactApp1.Server.DTO.Stock;
using ReactApp1.Server.Enums;
using ReactApp1.Server.Interfaces;
using System.Data;

namespace ReactApp1.Server.Services
{
    public class SQLService : ISQLRepository
    {
        private readonly IGenericRepository<StockReport> _stockReportRepository;
        private readonly IMapper _mapper;
        public SQLService
        (
            IGenericRepository<StockReport> stockReportRepository, 
            IMapper mapper
        ) 
        { 
            _stockReportRepository = stockReportRepository;
            _mapper = mapper;
        }
        public ApiResponse<IEnumerable<StockReport>> GetStock()
        {
            try
            {
                var data = _stockReportRepository.ExecuteStoredProcedure<StockReport>("GetStock");
                return new ApiResponse<IEnumerable<StockReport>>((int)PublicStatusCode.Done, _mapper.Map<IEnumerable<StockReport>>(data));
            }
            catch (Exception)
            {
                return new ApiResponse<IEnumerable<StockReport>>((int)PublicStatusCode.InternalServerError);
            }
        }

        public ApiResponse<StockReport> GetStockWithIdStockEntry(int IdStockEntry)
        {
            try
            {
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@IdStockEntry", SqlDbType.Int) { Value = IdStockEntry },
                };

                var data = _stockReportRepository.ExecuteStoredProcedure<StockReport>("GetStockWithIdStockEntry", parameters).FirstOrDefault();
                return new ApiResponse<StockReport>((int)PublicStatusCode.Done, _mapper.Map<StockReport>(data));
            }
            catch (Exception)
            {
                return new ApiResponse<StockReport>((int)PublicStatusCode.InternalServerError);
            }
        }
    }
}
