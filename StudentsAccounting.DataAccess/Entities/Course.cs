using System;
using System.Collections.Generic;
using System.Text;

namespace StudentsAccounting.DataAccess.Entities
{
    public class Course
    {
        public Course()
        {
            Attenders = new List<User>();
        }

        public int Id { get; set; }
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public virtual List<User> Attenders { get; set; }
    }
}
