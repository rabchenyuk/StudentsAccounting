using Microsoft.AspNetCore.Identity;
using StudentsAccounting.BusinessLogic.DTO.AuthDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface IAuthService
    {
        Task<string> Login(LoginDTO loginDTO);
        Task<IdentityResult> Register(RegisterDTO registerDTO);
        Task<(string userId, string code)> GenerateToken();
        Task SendEmail(string callbackUrl, string email);
        Task<IdentityResult> Confirmation(string userId, string code);
    }
}
