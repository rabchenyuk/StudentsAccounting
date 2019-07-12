using StudentsAccounting.WebAPI.ViewModels.UserViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentsAccounting.WebAPI.ViewModels.CourseViewModels
{
    public class CourseViewModel
    {
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public List<UserViewModel> Attenders { get; set; }
    }
}
