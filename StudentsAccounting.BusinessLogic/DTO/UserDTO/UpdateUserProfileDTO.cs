using Microsoft.AspNetCore.Http;

namespace StudentsAccounting.BusinessLogic.DTO.UserDTO
{
    public class UpdateUserProfileDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public IFormFile File { get; set; }
    }
}