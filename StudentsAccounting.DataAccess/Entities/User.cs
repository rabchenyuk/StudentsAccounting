﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace StudentsAccounting.DataAccess.Entities
{
    public class User : IdentityUser<int>
    {
        public User()
        {
            RegistrationDate = DateTime.Now;
            Courses = new List<UsersCourses>();
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhotoUrl { get; set; }
        public byte Age { get; set; }
        public bool IsMale { get; set; }
        public DateTime RegistrationDate { get; set; }
        public virtual List<UsersCourses> Courses { get; set; }
    }
}
