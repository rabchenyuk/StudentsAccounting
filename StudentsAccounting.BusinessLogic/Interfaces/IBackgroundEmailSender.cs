using System;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface IBackgroundEmailSender
    {
        void SendNotificationEmails(int userId, int courseId, DateTime startDate);
    }
}