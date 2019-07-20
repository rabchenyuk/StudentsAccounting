using Microsoft.AspNetCore.Http;

namespace StudentsAccounting.WebAPI.ViewModels.UserViewModels
{
    public class PhotoViewModel
    {
        public IFormFile File { get; set; }
    }
}