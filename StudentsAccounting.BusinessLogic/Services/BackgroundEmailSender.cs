using Hangfire;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.DataAccess.Entities;
using StudentsAccounting.DataAccess.Interfaces;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Services
{
    public class BackgroundEmailSender : IBackgroundEmailSender
    {
        private readonly IEmailSender _emailSender;
        private readonly IRepository<User> _userRepo;
        private readonly IRepository<Course> _courseRepo;
        private readonly IRepository<UsersCourses> _usersCoursesRepo;

        public BackgroundEmailSender(IEmailSender emailSender,
                                     IRepository<User> userRepo,
                                     IRepository<UsersCourses> usersCoursesRepo,
                                     IRepository<Course> courseRepo)
        {
            _emailSender = emailSender;
            _userRepo = userRepo;
            _courseRepo = courseRepo;
            _usersCoursesRepo = usersCoursesRepo;
        }

        public async Task SendNotificationEmails(int userId, int courseId)
        {
            var user = await _userRepo.GetSingleAsync(u => u.Id == userId);
            var currentCourse = await _courseRepo.GetByIdAsync(courseId);
            var monthNotify = currentCourse.StartDate.Subtract(currentCourse.StartDate.AddMinutes(10).Subtract(currentCourse.StartDate));
            var weekNotify = currentCourse.StartDate.Subtract((currentCourse.StartDate.AddMinutes(5).Subtract(currentCourse.StartDate)));
            var dayNotify = currentCourse.StartDate.Subtract((currentCourse.StartDate.AddMinutes(2).Subtract(currentCourse.StartDate)));

            BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync("d.rabchenyuk@gmail.com", "Montly Course start", $"Your course will start at { currentCourse.StartDate - monthNotify}"), monthNotify);
            BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync("d.rabchenyuk@gmail.com", "Weekly Course notification", $"Your course will start at {currentCourse.StartDate - weekNotify}"), weekNotify);
            BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync("d.rabchenyuk@gmail.com", "Day Course notification", $"Your course will start at {currentCourse.StartDate - dayNotify}"), dayNotify);
        }
    }
}