using System;
using System.Collections.Generic;
using System.Text;

namespace StudentsAccounting.BusinessLogic.DTO.CourseDTO
{
    public class CourseForAdminDTO
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public List<UserDTO.UserDTO> Attenders { get; set; }
    }
}
