using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudentsAccounting.DataAccess.Entities;

namespace StudentsAccounting.DataAccess.Configuration.InitialData
{
    public class UsersCoursesInitialData : IEntityTypeConfiguration<UsersCourses>
    {
        public void Configure(EntityTypeBuilder<UsersCourses> builder)
        {
            var usersCourses = new UsersCourses[]
            {
                new UsersCourses
                {
                    UserId = 1,
                    CourseId = 1
                },
                new UsersCourses
                {
                    UserId = 1,
                    CourseId = 2
                },
                new UsersCourses
                {
                    UserId = 2,
                    CourseId = 3
                },
                new UsersCourses
                {
                    UserId = 3,
                    CourseId = 4
                },
                new UsersCourses
                {
                    UserId = 3,
                    CourseId = 5
                },
                new UsersCourses
                {
                    UserId = 5,
                    CourseId = 5
                },
                new UsersCourses
                {
                    UserId = 5,
                    CourseId = 6
                },
                new UsersCourses
                {
                    UserId = 6,
                    CourseId = 1
                },
                new UsersCourses
                {
                    UserId = 6,
                    CourseId = 2
                },
                new UsersCourses
                {
                    UserId = 7,
                    CourseId = 5
                },
            };
            builder.HasData(usersCourses);
        }
    }
}
