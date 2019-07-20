using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentsAccounting.BusinessLogic.DTO.AuthDTO;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.WebAPI.Helpers;
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

        public AuthController(IMapper mapper, IAuthService authService, IEmailSender emailSender)
        {
            _mapper = mapper;
            _authService = authService;
            _emailSender = emailSender;
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel loginViewModel)
        {
            var userToLogin = _mapper.Map<LoginDTO>(loginViewModel);
            var user = await _authService.Login(userToLogin);
            if (user == null)
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
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
                    new { userId = result.userId, code = result.code },
                    protocol: HttpContext.Request.Scheme);
                await _authService.SendEmail(callbackUrl, registerViewModel.Login);
                return Content("To finish registration check your email");
            }
            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            var result = await _authService.Confirmation(userId, code);
            if (result.Succeeded)
                return Redirect("/");
            return BadRequest();
        }
    }
}