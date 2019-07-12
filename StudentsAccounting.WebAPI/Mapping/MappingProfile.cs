using AutoMapper;
using StudentsAccounting.BusinessLogic.DTO.AuthDTO;
using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using StudentsAccounting.WebAPI.ViewModels.AuthViewModels;
using StudentsAccounting.WebAPI.ViewModels.CourseViewModels;

namespace StudentsAccounting.WebAPI.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LoginViewModel, LoginDTO>();
            CreateMap<RegisterViewModel, RegisterDTO>();
            CreateMap<CoursesPagingViewModel, CoursesPagingDTO>();
            CreateMap<CourseDTO, CourseViewModel>();
        }
    }
}
