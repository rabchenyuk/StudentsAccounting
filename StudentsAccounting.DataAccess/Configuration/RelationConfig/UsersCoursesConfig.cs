﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudentsAccounting.DataAccess.Entities;

namespace StudentsAccounting.DataAccess.Configuration.RelationConfig
{
    public class UsersCoursesConfig : IEntityTypeConfiguration<UsersCourses>
    {
        public void Configure(EntityTypeBuilder<UsersCourses> builder)
        {
            builder.HasKey(x => new { x.UserId, x.CourseId, x.StartDate });
            builder.HasOne(u => u.User).WithMany(c => c.Courses).HasForeignKey(u => u.UserId);
            builder.HasOne(c => c.Course).WithMany(u => u.Attenders).HasForeignKey(c => c.CourseId);
        }
    }
}