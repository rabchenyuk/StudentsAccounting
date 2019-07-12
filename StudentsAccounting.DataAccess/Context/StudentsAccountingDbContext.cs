using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentsAccounting.DataAccess.Configuration.InitialData;
using StudentsAccounting.DataAccess.Entities;

namespace StudentsAccounting.DataAccess.Context
{
    public class StudentsAccountingDbContext :  IdentityDbContext<User, IdentityRole<int>, int>
    {
        public StudentsAccountingDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<Course> Courses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new CoursesInitialData());
        }
    }
}
