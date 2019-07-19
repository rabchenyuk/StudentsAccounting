using System.Collections.Generic;

namespace StudentsAccounting.WebAPI.ViewModels.UserViewModels
{
    public class UserWithCoursesViewModel : UserViewModel
    {
        public List<CourseViewModels.CourseViewModel> Courses { get; set; }
    }
}