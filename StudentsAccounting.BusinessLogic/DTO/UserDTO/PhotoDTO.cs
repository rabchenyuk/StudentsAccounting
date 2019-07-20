using Microsoft.AspNetCore.Http;

namespace StudentsAccounting.BusinessLogic.DTO.UserDTO
{
    public class PhotoDTO
    {
        public IFormFile File { get; set; }
    }
}