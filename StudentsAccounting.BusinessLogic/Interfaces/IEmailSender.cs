using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
