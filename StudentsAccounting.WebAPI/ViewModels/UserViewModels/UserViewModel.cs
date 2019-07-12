using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentsAccounting.WebAPI.ViewModels.UserViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhotoUrl { get; set; }
        public byte Age { get; set; }
        public bool IsMale { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
