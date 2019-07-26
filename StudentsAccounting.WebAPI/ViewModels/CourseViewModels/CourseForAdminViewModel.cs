using StudentsAccounting.WebAPI.ViewModels.UserViewModels;
using System;
using System.Collections.Generic;

namespace StudentsAccounting.WebAPI.ViewModels.CourseViewModels
{
    public class CourseForAdminViewModel
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public List<UserViewModel> Attenders { get; set; }
    }
}