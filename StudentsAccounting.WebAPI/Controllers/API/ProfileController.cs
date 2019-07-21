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

        public ProfileController(IProfileService profile, IMapper mapper, IOptions<PhotoSettings> options, IBackgroundJobClient backgroundJob)
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

        [Authorize]
        [HttpPut("{userId}/[action]")]
        public async Task<IActionResult> UpdateProfileInfo(int userId, [FromBody]UserViewModel userInfo)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var userInfoForUpdate = _mapper.Map<UserDTO>(userInfo);
            var user = await _profile.UpdateProfileInfo(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), userInfoForUpdate);
            if (user == null)
                return BadRequest("Something went wrong");
            return Ok(_mapper.Map<UserViewModel>(user));
        }

        [Authorize]
        [HttpPost("{userId}/setPhoto")]
        public async Task<IActionResult> SetProfilePhoto(int userId, [FromForm]PhotoViewModel photo)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if (photo.File != null)
            {
                if (photo.File.Length > _photoSettings.MaxBytes)
                    return BadRequest("Maximum file size exceeded");

                if (!_photoSettings.IsSupported(photo.File.FileName))
                    return BadRequest("Invalid file type");
            }
            var res = await _profile.SetPhoto(userId, _mapper.Map<PhotoDTO>(photo));
            if (!res.Successful)
                return BadRequest(res.Information);
            return Ok(res.Information);
        }
    }
}