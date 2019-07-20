using StudentsAccounting.BusinessLogic.DTO.UserDTO;
using StudentsAccounting.BusinessLogic.Helpers;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface IProfileService
    {
        Task<UserDTO> GetProfileInfo(int userId);
        Task<UserDTO> UpdateProfileInfo(int userId, UserDTO userInfo);
        Task<Response> SetPhoto(int userId, PhotoDTO photo);
    }
}