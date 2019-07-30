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
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public virtual List<UsersCourses> Attenders { get; set; }
    }
}