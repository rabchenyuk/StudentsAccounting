using StudentsAccounting.BusinessLogic.Helpers;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.DataAccess.Entities;
using StudentsAccounting.DataAccess.Interfaces;
using System.Threading.Tasks;
using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using StudentsAccounting.BusinessLogic.DTO.UserDTO;
using AutoMapper;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System;

namespace StudentsAccounting.BusinessLogic.Services
{
    public class StudentService : IStudentService
    {
        private readonly IRepository<User> _userRepo;
        private readonly IRepository<UsersCourses> _usersCoursesRepo;
        private readonly IMapper _mapper;

        public StudentService(IRepository<User> userRepo, IRepository<UsersCourses> usersCoursesRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _usersCoursesRepo = usersCoursesRepo;
            _mapper = mapper;
        }

        public async Task<UserWithCoursesDTO> GetStudent(int id)
        {
            var student = await _userRepo.GetByIdAsync(id);
            if (student == null)
                return null;
            return _mapper.Map<UserWithCoursesDTO>(student);
        }

        public async Task<PageInfo<UserDTO>> GetStudents(QueryParamsDTO queryParams)
        {
            var students = _userRepo.GetAllQueryable();
            if (!string.IsNullOrEmpty(queryParams.Search))
                students = students.Where(s => s.FirstName.ToLower().Equals(queryParams.Search.ToLower())
                || s.LastName.ToLower().Equals(queryParams.Search.ToLower())
                || (s.FirstName + ' ' + s.LastName).ToLower().Equals(queryParams.Search.ToLower())
                || (s.LastName + ' ' + s.FirstName).ToLower().Equals(queryParams.Search.ToLower()));
            var columnsMap = new Dictionary<string, Expression<Func<User, object>>>
            {
                ["Id"] = s => s.Id,
                ["FirstName"] = s => s.FirstName,
                ["LastName"] = s => s.LastName,
                ["Age"] = s => s.Age,
                ["Email"] = s => s.Email,
                ["RegisteredDate"] = s => s.RegistrationDate
            };
            students = students.ApplyOrdering(queryParams, columnsMap);
            var pagedStudents = await PagedList<User>.CreateAsync(students, queryParams.CurrentPage, queryParams.PageSize);
            var listModel = _mapper.Map<IEnumerable<UserDTO>>(pagedStudents);
            var outputModel = new PageInfo<UserDTO>
            {
                List = listModel,
                Info = new PaginationOutputInfo
                {
                    CurrentPage = pagedStudents.CurrentPage,
                    PageSize = pagedStudents.PageSize,
                    TotalCount = pagedStudents.TotalCount,
                    TotalPages = pagedStudents.TotalPages
                }
            };
            return outputModel;
        }

        public async Task<Response> RegisterToCourse(int userId, int courseId)
        {
            var res = new Response();
            var userInCourse = await _usersCoursesRepo.GetSingleAsync(u => u.UserId == userId && u.CourseId == courseId);
            if (userInCourse == null)
            {
                var userCourse = new UsersCourses { UserId = userId, CourseId = courseId };
                try
                {
                    _usersCoursesRepo.Add(userCourse);
                    res.Successful = true;
                    res.Information = "You have successfully registered to course";
                    return res;
                }
                catch (Exception e)
                {
                    res.Successful = false;
                    res.Information = e.Message;
                    return res;
                }
            }
            else
            {
                res.Successful = false;
                res.Information = "You have already registered on this course";
                return res;
            }
        }
    }
}