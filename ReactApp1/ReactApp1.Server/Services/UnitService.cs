using AutoMapper;
using ReactApp1.Server.Classes;
using ReactApp1.Server.DTO;
using ReactApp1.Server.DTO.UnitsDTO;
using ReactApp1.Server.Enums;
using ReactApp1.Server.Helpers;
using ReactApp1.Server.Interfaces;

namespace ReactApp1.Server.Services
{
    public class UnitService : IUnitService
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Unit> _unitRepository;
        private readonly IWebHostEnvironment _environment;
        private readonly FileService _fileService;

        public UnitService
        (
            IMapper mapper,
            IGenericRepository<Unit> unitRepository,
            IWebHostEnvironment environment,
            FileService fileService
        )
        {
            _mapper = mapper;
            _unitRepository = unitRepository;
            _environment = environment;
            _fileService = fileService;
        }

        public ApiResponse<IEnumerable<UnitDTO>> ListAllUnits()
        {
            try
            {
                var data = _unitRepository.FindByCriteria(_ => !_.IsDeleted);
                return new ApiResponse<IEnumerable<UnitDTO>>((int)PublicStatusCode.Done, _mapper.Map<IList<UnitDTO>>(_unitRepository.FindByCriteria(_ => !_.IsDeleted)));
            }
            catch (Exception)
            {
                return new ApiResponse<IEnumerable<UnitDTO>>((int)PublicStatusCode.InternalServerError);
            }
        }

        public ApiResponse<UnitDTO> GetUnitById(int id)
        {
            try
            {
                var unit = _unitRepository.GetById(id);
                return new ApiResponse<UnitDTO>((int)PublicStatusCode.Done, _mapper.Map<UnitDTO>(unit));
            }
            catch (Exception)
            {
                return new ApiResponse<UnitDTO>((int)PublicStatusCode.InternalServerError);
            }
        }

        public ApiResponse<UnitDTO> EditUnit(UnitDTO UnitDTO)
        {
            try
            {
                var unit = _unitRepository.GetById(UnitDTO.Id.Value);
                unit.Name = UnitDTO.Name;
                _unitRepository.Update(unit);
                return new ApiResponse<UnitDTO>((int)PublicStatusCode.Done, _mapper.Map<UnitDTO>(unit));
            }
            catch (Exception)
            {
                return new ApiResponse<UnitDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
        public ApiResponse<UnitDTO> DeleteUnit(int id)
        {
            try
            {
                var unit = _unitRepository.GetById(id);
                unit.IsDeleted = true;
                _unitRepository.Update(unit);
                return new ApiResponse<UnitDTO>((int)PublicStatusCode.Done, _mapper.Map<UnitDTO>(unit));
            }
            catch (Exception)
            {
                return new ApiResponse<UnitDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
        public ApiResponse<UnitDTO> CreateUnit(UnitDTO UnitDTO)
        {
            try
            {
                var unit = _mapper.Map(UnitDTO, new Unit() { InsertionDate = DateTime.Now });
                _unitRepository.Add(unit);
                return new ApiResponse<UnitDTO>((int)PublicStatusCode.Done, _mapper.Map<UnitDTO>(unit));
            }
            catch (Exception)
            {
                return new ApiResponse<UnitDTO>((int)PublicStatusCode.InternalServerError);
            }
        }
    }
}
