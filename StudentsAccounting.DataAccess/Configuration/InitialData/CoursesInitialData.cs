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
                    Description = "Applied mathematics is the application of mathematical methods by different fields such as science, engineering, business, computer science, and industry. Thus, applied mathematics is a combination of mathematical science and specialized knowledge."
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Programming",
                    Description = "Computer programmers write code to create software programs. They turn the program designs created by software developers and engineers into instructions that a computer can follow."
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Data science",
                    Description = "Data science is a multi-disciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data."
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Chemistry",
                    Description = "Organic chemistry is the study of the structure, properties, composition, mechanisms, and reactions of organic compounds."
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Driving",
                    Description = "Driver responsibilities include arranging regular cleaning and maintenance services for the vehicle, planning each route based on road and traffic conditions and managing payments."
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Cooking",
                    Description = "Cooking or cookery is the art, technology, science and craft of preparing food for consumption."
                },
                new Course
                {
                    Id = ++id,
                    CourseName = "Machine learning",
                    Description = "Machine learning (ML) is the scientific study of algorithms and statistical models that computer systems use in order to perform a specific task effectively without using explicit instructions, relying on patterns and inference instead."
                }
            };
            builder.HasData(course);
        }
    }
}