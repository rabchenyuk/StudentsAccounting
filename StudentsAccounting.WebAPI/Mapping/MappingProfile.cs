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
            CreateMap<CoursesQueryViewModel, CoursesPagingDTO>();
            CreateMap<CoursesQueryViewModel, QueryParamsDTO>();
            CreateMap<CourseDTO, CourseViewModel>();
            CreateMap<CourseForAdminDTO, CourseForAdminViewModel>();
            CreateMap<StudentQueryViewModel, QueryParamsDTO>();
            CreateMap<UserDTO, UserViewModel>();
            CreateMap<UserDTO, UserForAdminViewModel>();
            CreateMap<UserViewModel, UserDTO>();
            CreateMap<UserWithCoursesDTO, UserWithCoursesViewModel>();
            CreateMap<UpdateUserProfileViewModel, UpdateUserProfileDTO>();
        }
    }
}