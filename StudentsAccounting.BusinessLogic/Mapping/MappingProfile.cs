using AutoMapper;
using StudentsAccounting.BusinessLogic.DTO.AuthDTO;
using StudentsAccounting.DataAccess.Entities;

namespace StudentsAccounting.BusinessLogic.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterDTO, User>()
                .ForMember(u => u.Email, opt => opt.MapFrom(r => r.Login));
        }
    }
}
