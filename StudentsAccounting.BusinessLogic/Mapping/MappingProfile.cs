using AutoMapper;
using StudentsAccounting.BusinessLogic.DTO.AuthDTO;
using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using StudentsAccounting.BusinessLogic.DTO.UserDTO;
using StudentsAccounting.DataAccess.Entities;
using System.Linq;

namespace StudentsAccounting.BusinessLogic.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterDTO, User>()
                .ForMember(u => u.Email, opt => opt.MapFrom(r => r.Login));
            CreateMap<Course, CourseDTO>();
            CreateMap<Course, CourseForAdminDTO>()
                .ForMember(c => c.Attenders, opt => opt.MapFrom(u => u.Attenders.Select(user => new UserDTO
                {
                    Id = user.User.Id,
                    FirstName = user.User.FirstName,
                    LastName = user.User.LastName,
                    Age = user.User.Age,
                    IsMale = user.User.IsMale,
                    PhotoUrl = user.User.PhotoUrl,
                    RegistrationDate = user.User.RegistrationDate
                })));
            CreateMap<User, UserDTO>();
        }
    }
}