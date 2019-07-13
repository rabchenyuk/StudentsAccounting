using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudentsAccounting.DataAccess.Entities;

namespace StudentsAccounting.DataAccess.Configuration.InitialData
{
    public class CoursesInitialData : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            int id = 0;
            var course = new Course[]
            {
                new Course
                {
                    Id = ++id,
                    CourseName = "Applied math",
                    StartDate = new System.DateTime(2019, 7, 15)
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Programming",
                    StartDate = new System.DateTime(2019, 7, 15)
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Data science",
                    StartDate = new System.DateTime(2019, 8, 15)
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Chemistry",
                    StartDate = new System.DateTime(2019, 9, 15)
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Driving",
                    StartDate = new System.DateTime(2019, 10, 15)
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Cooking",
                    StartDate = new System.DateTime(2019, 11, 15)
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Machine learning",
                    StartDate = new System.DateTime(2019, 12, 15)
                },
            };
            builder.HasData(course);
        }
    }
}