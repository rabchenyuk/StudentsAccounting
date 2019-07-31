using Microsoft.AspNetCore.Identity;
using StudentsAccounting.BusinessLogic.DTO.AuthDTO;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface IAuthService
    {
        Task<string> Login(LoginDTO loginDTO);
        Task<IdentityResult> Register(RegisterDTO registerDTO);
        Task<(string userId, string code)> GenerateToken();
        Task SendEmail(string callbackUrl, string email);
        Task SendPassword(string callbackUrl, string email);
        Task<string> Confirmation(string userId, string code, string password);
        Task<(string userId, string code)> ForgotPassword(string email);
        Task<IdentityResult> ResetPassword(string email, string code, string password);
    }
}