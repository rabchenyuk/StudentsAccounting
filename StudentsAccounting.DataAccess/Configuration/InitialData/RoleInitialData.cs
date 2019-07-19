using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StudentsAccounting.DataAccess.Configuration.InitialData
{
    public class RoleInitialData : IEntityTypeConfiguration<IdentityRole<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityRole<int>> builder)
        {
            int roleId = 1;
            IdentityRole<int>[] identityRoles = new IdentityRole<int>[]
            {
                new IdentityRole<int>
                {
                    Id=roleId++,
                    Name="admin",
                    NormalizedName="admin".ToUpper()
                },
                new IdentityRole<int>
                {
                    Id=roleId++,
                    Name="student",
                    NormalizedName="student".ToUpper()
                }
            };
            builder.HasData(identityRoles);
        }
    }
}
