using Microsoft.AspNetCore.Http;

namespace StudentsAccounting.WebAPI.ViewModels.UserViewModels
{
    public class UpdateUserProfileViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public IFormFile File { get; set; }
    }
}