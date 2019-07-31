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

        public void SendNotificationEmails(string email, string courseName, DateTime startDate)
        {
            //var monthNotify = startDate.Subtract(startDate.AddMinutes(10).Subtract(startDate));
            //var weekNotify = startDate.Subtract((startDate.AddMinutes(5).Subtract(startDate)));
            //var dayNotify = startDate.Subtract((startDate.AddMinutes(2).Subtract(startDate)));
            var monthNotify = startDate.Subtract(startDate.AddMonths(1).Subtract(startDate));
            var weekNotify = startDate.Subtract((startDate.AddDays(7).Subtract(startDate)));
            var hoursInDate = startDate.Hour;
            var minutesInDate = startDate.Minute;
            var newDate = startDate.Subtract(startDate.AddDays(1).Subtract(startDate.AddHours(-hoursInDate).AddMinutes(-minutesInDate)));
            var dayNotify = newDate.AddHours(8);

            if (DateTime.Now < monthNotify)
                BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync(email, "Montly Course start", $"Your course {courseName} will start at {startDate}"), monthNotify);
            if(DateTime.Now < weekNotify)
                BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync(email, "Weekly Course notification", $"Your course {courseName} will start at {startDate}"), weekNotify);
            BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync(email, "Day Course notification", $"Your course {courseName} will start at {startDate}"), dayNotify);
        }
    }
}