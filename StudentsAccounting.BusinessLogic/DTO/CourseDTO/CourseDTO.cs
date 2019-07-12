using System;
using System.Collections.Generic;

namespace StudentsAccounting.BusinessLogic.DTO.CourseDTO
{
    public class CourseDTO
    {
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public List<UserDTO.UserDTO> Attenders { get; set; }
    }
}
