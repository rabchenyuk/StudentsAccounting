using AutoMapper;
using Microsoft.AspNetCore.Identity;
using StudentsAccounting.BusinessLogic.DTO.AuthDTO;
using StudentsAccounting.BusinessLogic.DTO.UserDTO;
using StudentsAccounting.BusinessLogic.Helpers;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Services
{
    public class AuthService : IAuthService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly IEmailSender _emailSender;
        public string tokenToReturn;
        private User currentUser;

        public AuthService(IMapper mapper, UserManager<User> userManager, IJwtFactory jwtFactory, IEmailSender emailSender)
        {
            _mapper = mapper;
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _emailSender = emailSender;
        }

        public async Task<string> Login(LoginDTO loginDTO)
        {
            var result = await _userManager.FindByEmailAsync(loginDTO.Login.ToLower());
            if (result != null)
            {
                var userRoles = await _userManager.GetRolesAsync(result);
                var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, result.Id.ToString()),
                        new Claim(ClaimTypes.Name, result.FirstName == null ? result.Email : result.FirstName),
                        new Claim(ClaimTypes.Role, userRoles.Count > 0 ? userRoles[0].ToLower() : "No role"),
                        new Claim(ClaimTypes.IsPersistent, result.EmailConfirmed.ToString() ?? "Not confirmed")
                    };
                tokenToReturn = await _userManager.CheckPasswordAsync(result, loginDTO.Password) ? _jwtFactory.GenerateEncodedToken(claims) : null;
            }
            return tokenToReturn;
        }

        public async Task<IdentityResult> Register(RegisterDTO registerDTO)
        {
            var userToCreate = _mapper.Map<User>(registerDTO);
            userToCreate.UserName = registerDTO.Login;
            var res = await _userManager.CreateAsync(userToCreate, registerDTO.Password);
            if (res.Succeeded)
                currentUser = userToCreate;
            return res;
        }

        public async Task<(string userId, string code)> GenerateToken()
        {
            string code = await _userManager.GenerateEmailConfirmationTokenAsync(currentUser);
            return (currentUser.Id.ToString(), code);
        }

        public async Task SendEmail(string callbackUrl, string email)
        {
            await _emailSender.SendEmailAsync(email, "Confirm your account",
                $"Finish your registration using this link: <a href='{callbackUrl}'>link</a>");
        }

        public async Task<string> Confirmation(string userId, string code, string password)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return null;
            await _userManager.AddToRoleAsync(user, "student");
            await _userManager.ConfirmEmailAsync(user, code);
            var userToLogin = new LoginDTO { Login = user.Email, Password = password };
            return await Login(userToLogin);
        }
    }
}