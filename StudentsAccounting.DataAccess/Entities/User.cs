using Microsoft.AspNetCore.Identity;
using System;

namespace StudentsAccounting.DataAccess.Entities
{
    public class User : IdentityUser<int>
    {
        public User()
        {
            RegistrationDate = DateTime.Now;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhotoUrl { get; set; }
        public byte Age { get; set; }
        public bool IsMale { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
