using System.Collections.Generic;

namespace StudentsAccounting.BusinessLogic.DTO.UserDTO
{
    public class UserWithCoursesDTO : UserDTO
    {
        public List<CourseDTO.CourseDTO> Courses { get; set; }
    }
}