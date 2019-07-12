using AutoMapper;
using StudentsAccounting.BusinessLogic.DTO.AuthDTO;
using StudentsAccounting.WebAPI.ViewModels.AuthViewModels;

namespace StudentsAccounting.WebAPI.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LoginViewModel, LoginDTO>();
            CreateMap<RegisterViewModel, RegisterDTO>();
        }
    }
}
