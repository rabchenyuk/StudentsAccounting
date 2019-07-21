using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface IBackgroundEmailSender
    {
        Task SendNotificationEmails(int userId, int courseId);
    }
}