using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using StudentsAccounting.BusinessLogic.DTO.UserDTO;
using StudentsAccounting.BusinessLogic.Helpers;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.DataAccess.Entities;
using StudentsAccounting.DataAccess.Interfaces;
using System;
using System.IO;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IRepository<User> _userRepo;
        private readonly IMapper _mapper;
        private readonly IHostingEnvironment _host;

        public ProfileService(IRepository<User> userRepo, IMapper mapper, IHostingEnvironment host)
        {
            _userRepo = userRepo;
            _mapper = mapper;
            _host = host;
        }

        public async Task<UserDTO> GetProfileInfo(int userId)
        {
            var userInfo = await _userRepo.GetByIdAsync(userId);
            return _mapper.Map<UserDTO>(userInfo);
        }

        public async Task<UserDTO> UpdateProfileInfo(int userId, UpdateUserProfileDTO userInfo)
        {
            string fileName = null;
            if (userInfo.File != null)
            {
                var photoFolderPath = Path.Combine(_host.WebRootPath, "UserProfilePhoto");
                if (!Directory.Exists(photoFolderPath))
                    Directory.CreateDirectory(photoFolderPath);
                fileName = Guid.NewGuid().ToString() + Path.GetExtension(userInfo.File.FileName);
                var filePath = Path.Combine(photoFolderPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await userInfo.File.CopyToAsync(stream);
                }
            }
            var user = await _userRepo.GetByIdAsync(userId);
            user.FirstName = userInfo.FirstName;
            user.LastName = userInfo.LastName;
            user.Age = userInfo.Age;
            user.Gender = userInfo.Gender;
            user.PhotoUrl = fileName;
            try
            {
                _userRepo.Edit(user);
                return _mapper.Map<UserDTO>(user);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}