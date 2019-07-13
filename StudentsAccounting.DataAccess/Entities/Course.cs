using System;
using System.Collections.Generic;

namespace StudentsAccounting.DataAccess.Entities
{
    public class Course
    {
        public Course()
        {
            Attenders = new List<UsersCourses>();
        }

        public int Id { get; set; }
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public virtual List<UsersCourses> Attenders { get; set; }
    }
}