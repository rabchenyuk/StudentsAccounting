using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using StudentsAccounting.BusinessLogic.DTO.UserDTO;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.WebAPI.ViewModels.UserViewModels;
using System.Security.Claims;
using System.Threading.Tasks;
using StudentsAccounting.WebAPI.Helpers;
using Hangfire;

namespace StudentsAccounting.WebAPI.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profile;
        private readonly IMapper _mapper;
        private readonly IBackgroundJobClient _backgroundJob;
        private readonly PhotoSettings _photoSettings;

        public ProfileController(IProfileService profile,
                                 IMapper mapper,
                                 IOptions<PhotoSettings> options,
                                 IBackgroundJobClient backgroundJob)
        {
            _profile = profile;
            _mapper = mapper;
            _backgroundJob = backgroundJob;
            _photoSettings = options.Value;
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetProfileInfo()
        {
            var user = await _profile.GetProfileInfo(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));
            if (user == null)
                return BadRequest("Something went wrong");
            return Ok(_mapper.Map<UserViewModel>(user));
        }

        [Authorize(Roles = "student")]
        [HttpPut("{userId}/[action]")]
        public async Task<IActionResult> UpdateProfileInfo(int userId, [FromForm]UpdateUserProfileViewModel userInfo)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if (userInfo.File != null)
            {
                if (userInfo.File.Length > _photoSettings.MaxBytes)
                    return BadRequest("Maximum file size exceeded");

                if (!_photoSettings.IsSupported(userInfo.File.FileName))
                    return BadRequest("Invalid file type");
            }
            var userInfoForUpdate = _mapper.Map<UpdateUserProfileDTO>(userInfo);
            var user = await _profile.UpdateProfileInfo(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), userInfoForUpdate);
            if (user == null)
                return BadRequest("Something went wrong");
            return Ok(_mapper.Map<UserViewModel>(user));
        }
    }
}