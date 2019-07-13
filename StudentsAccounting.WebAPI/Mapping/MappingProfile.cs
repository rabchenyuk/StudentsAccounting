using AutoMapper;
using StudentsAccounting.BusinessLogic.DTO.AuthDTO;
using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using StudentsAccounting.BusinessLogic.DTO.UserDTO;
using StudentsAccounting.BusinessLogic.Helpers;
using StudentsAccounting.WebAPI.ViewModels.AuthViewModels;
using StudentsAccounting.WebAPI.ViewModels.CourseViewModels;
using StudentsAccounting.WebAPI.ViewModels.StudentViewModels;
using StudentsAccounting.WebAPI.ViewModels.UserViewModels;

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
            CreateMap<StudentQueryViewModel, QueryParamsDTO>();
            CreateMap<UserDTO, UserViewModel>();
        }
    }
}