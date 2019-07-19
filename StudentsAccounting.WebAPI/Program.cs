using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using StudentsAccounting.DataAccess.Entities;
using System;
using System.Linq;

namespace StudentsAccounting.WebAPI
{
    public static class SeedData
    {
        public static IWebHost SeedAdminUser(this IWebHost webHost)
        {
            using (var scope = webHost.Services.CreateScope())
            {
                try
                {
                    var context = scope.ServiceProvider.GetRequiredService<DbContext>();
                    context.Database.EnsureCreated();
                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                    if (!userManager.Users.Any(u => u.Email == "admin@gmail.com"))
                    {
                        var user = new User
                        {
                            UserName = "Admin",
                            Email = "admin@gmail.com",
                            FirstName = "Admin",
                            LastName = "Admin",
                            Age = 38,
                            EmailConfirmed = true,
                            IsMale = true,
                            RegistrationDate = new DateTime(2017, 9, 18)
                        };
                        userManager.CreateAsync(user, "12345Admin")
                        .Wait();
                        userManager.AddToRoleAsync(user, "admin").Wait();
                    }
                }
                catch (Exception ex)
                {
                    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding user.");
                }
            }
            return webHost;
        }
    }
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().SeedAdminUser().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}