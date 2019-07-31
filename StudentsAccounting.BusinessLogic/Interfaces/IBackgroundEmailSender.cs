using System;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface IBackgroundEmailSender
    {
        void SendNotificationEmails(string email, string courseName, DateTime startDate);
    }
}