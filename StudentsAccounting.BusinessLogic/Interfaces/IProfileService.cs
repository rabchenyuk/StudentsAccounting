using StudentsAccounting.BusinessLogic.DTO.UserDTO;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface IProfileService
    {
        Task<UserDTO> GetProfileInfo(int userId);
        Task<UserDTO> UpdateProfileInfo(int userId, UpdateUserProfileDTO userInfo);
    }
}