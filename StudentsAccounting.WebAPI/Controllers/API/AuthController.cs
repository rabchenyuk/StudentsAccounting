using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using StudentsAccounting.BusinessLogic.DTO.AuthDTO;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.WebAPI.ViewModels.AuthViewModels;
using System.Threading.Tasks;

namespace StudentsAccounting.WebAPI.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IEmailSender _emailSender;
        private readonly IAuthenticationSchemeProvider _scheme;

        public AuthController(IMapper mapper, IAuthService authService, IEmailSender emailSender, IAuthenticationSchemeProvider scheme)
        {
            _mapper = mapper;
            _authService = authService;
            _emailSender = emailSender;
            _scheme = scheme;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel loginViewModel)
        {
            var userToLogin = _mapper.Map<LoginDTO>(loginViewModel);
            var user = await _authService.Login(userToLogin);
            if (user == null)
                return BadRequest("Invalid username or password");
            return Ok(new { token = user });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel registerViewModel)
        {
            var userToRegister = _mapper.Map<RegisterDTO>(registerViewModel);
            var user = await _authService.Register(userToRegister);
            if (user.Succeeded)
            {
                var result = await _authService.GenerateToken();
                var callbackUrl = Url.Action(
                    "ConfirmEmail",
                    "Auth",
                    new { userId = result.userId, code = result.code, password = registerViewModel.Password },
                    protocol: HttpContext.Request.Scheme);
                await _authService.SendEmail(callbackUrl, registerViewModel.Login);
                return Ok("To finish registration check your email");
            }
            return BadRequest(user.Errors);
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string userId, string code, string password)
        {
            var result = await _authService.Confirmation(userId, code, password);
            if (!string.IsNullOrEmpty(result))
                return Redirect($"/confirm?token={result}");
            return BadRequest();
        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordViewModel forgotPassword)
        {
            var result = await _authService.ForgotPassword(forgotPassword.Email);
            if (result.userId == null)
                return BadRequest("User was not found");
            var callbackUrl = Url.Action(
                "ResetPassword", 
                "Auth", 
                new { userId = result.userId, code = result.code }, 
                protocol: HttpContext.Request.Scheme);
            await _authService.SendPassword(callbackUrl, forgotPassword.Email);
            return Content("Check your email");
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(string userId, string code, [FromForm]ResetPasswordViewModel resetPassword)
        {
            var result = await _authService.ResetPassword(resetPassword.Email, code, resetPassword.Password);
            if (result.Succeeded)
                return Content("Your password has been reset");
            return BadRequest("Something went wrong");
        }
    }
}