using AutoMapper;
using Microsoft.AspNetCore.Identity;
using StudentsAccounting.BusinessLogic.DTO.AuthDTO;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Policy;
using System.Text;
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
                var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, result.Id.ToString()),
                        new Claim(ClaimTypes.Name, result.FirstName == null ? result.Email : result.FirstName)
                    };

                tokenToReturn = await _userManager.CheckPasswordAsync(result, loginDTO.Password) ? _jwtFactory.GenerateEncodedToken(claims) : null;
            }

            return tokenToReturn;
        }

        public async Task<IdentityResult> Register(RegisterDTO registerDTO)
        {
            var userToCreate = _mapper.Map<User>(registerDTO);
            userToCreate.UserName = registerDTO.Login;
            var user = await _userManager.CreateAsync(userToCreate, registerDTO.Password);
            currentUser = userToCreate;
            return user;
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

        public async Task<IdentityResult> Confirmation(string userId, string code)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return null;

            var result = await _userManager.ConfirmEmailAsync(user, code);

            return result;
        }
    }
}
