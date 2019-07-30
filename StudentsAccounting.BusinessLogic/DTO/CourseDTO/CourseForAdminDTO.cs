using System.Collections.Generic;

namespace StudentsAccounting.BusinessLogic.DTO.CourseDTO
{
    public class CourseForAdminDTO
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public List<UserDTO.UserDTO> Attenders { get; set; }
    }
}