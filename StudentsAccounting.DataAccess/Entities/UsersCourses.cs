using System;

namespace StudentsAccounting.DataAccess.Entities
{
    public class UsersCourses
    {
        public int CourseId { get; set; }
        public int UserId { get; set; }
        public virtual Course Course { get; set; }
        public virtual User User { get; set; }
        public DateTime StartDate { get; set; }
    }
}