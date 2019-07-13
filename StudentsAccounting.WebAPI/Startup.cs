using AutoMapper;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.BusinessLogic.Services;
using StudentsAccounting.BusinessLogic.Helpers;
using StudentsAccounting.DataAccess.Context;
using StudentsAccounting.DataAccess.Entities;
using StudentsAccounting.DataAccess.Interfaces;
using StudentsAccounting.DataAccess.Repository;
using StudentsAccounting.WebAPI.ViewModels.AuthViewModels;
using StudentsAccounting.WebAPI.ViewModels.AuthViewModels.Validation;
using System.Reflection;
using System.Text;

namespace StudentsAccounting.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddFluentValidation(fv =>
                {
                    fv.RegisterValidatorsFromAssemblyContaining<Startup>();
                });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddScoped<DbContext, StudentsAccountingDbContext>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IStudentService, StudentService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<IJwtFactory, JwtFactory>();
            services.AddTransient<IValidator<LoginViewModel>, LoginValidation>();
            services.AddSingleton<IEmailSender, EmailSender>();

            services.AddAutoMapper(new Assembly[] 
            {
                typeof(StudentsAccounting.WebAPI.Mapping.MappingProfile).GetTypeInfo().Assembly,
                typeof(StudentsAccounting.BusinessLogic.Mapping.MappingProfile).GetTypeInfo().Assembly
            });

            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));

            services.AddDbContext<StudentsAccountingDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Default"),
                m => m.MigrationsAssembly("StudentsAccounting.WebAPI")));

            services.AddDefaultIdentity<User>()
                .AddRoles<IdentityRole<int>>()
                .AddEntityFrameworkStores<StudentsAccountingDbContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}