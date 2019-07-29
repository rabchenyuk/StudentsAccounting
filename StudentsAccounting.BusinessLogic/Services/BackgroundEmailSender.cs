using Hangfire;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.DataAccess.Entities;
using StudentsAccounting.DataAccess.Interfaces;
using System;

namespace StudentsAccounting.BusinessLogic.Services
{
    public class BackgroundEmailSender : IBackgroundEmailSender
    {
        private readonly IEmailSender _emailSender;
        private readonly IRepository<User> _userRepo;
        private readonly IRepository<UsersCourses> _courseRepo;

        public BackgroundEmailSender(IEmailSender emailSender,
                                     IRepository<User> userRepo,
                                     IRepository<UsersCourses> courseRepo)
        {
            _emailSender = emailSender;
            _userRepo = userRepo;
            _courseRepo = courseRepo;
        }

        public void SendNotificationEmails(int userId, int courseId, DateTime startDate)
        {
            var monthNotify = startDate.Subtract(startDate.AddMinutes(10).Subtract(startDate));
            var weekNotify = startDate.Subtract((startDate.AddMinutes(5).Subtract(startDate)));
            var dayNotify = startDate.Subtract((startDate.AddMinutes(2).Subtract(startDate)));

            BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync("d.rabchenyuk@gmail.com", "Montly Course start", $"Your course will start at {startDate - monthNotify}"), monthNotify);
            BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync("d.rabchenyuk@gmail.com", "Weekly Course notification", $"Your course will start at {startDate - weekNotify}"), weekNotify);
            BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync("d.rabchenyuk@gmail.com", "Day Course notification", $"Your course will start at {startDate - dayNotify}"), dayNotify);
        }
    }
}