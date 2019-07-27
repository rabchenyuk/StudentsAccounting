using AutoMapper;
using System.Linq;
using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using StudentsAccounting.BusinessLogic.Helpers;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.DataAccess.Entities;
using StudentsAccounting.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Services
{
    public class CourseService : ICourseService
    {
        private readonly IRepository<Course> _repo;
        private readonly IRepository<UsersCourses> _usersCoursesRepo;
        private readonly IMapper _mapper;
        private readonly IBackgroundEmailSender _backgroundEmailSender;

        public CourseService(IRepository<Course> repo,
                             IRepository<UsersCourses> usersCoursesRepo,
                             IMapper mapper,
                             IBackgroundEmailSender backgroundEmailSender)
        {
            _repo = repo;
            _usersCoursesRepo = usersCoursesRepo;
            _mapper = mapper;
            _backgroundEmailSender = backgroundEmailSender;
        }

        public async Task<PageInfo<CourseDTO>> GetAllCourses(CoursesPagingDTO paging)
        {
            var courses = _repo.GetAllQueryable();
            var pagedCourses = await PagedList<Course>.CreateAsync(courses, paging.CurrentPage, paging.PageSize);
            var listModel = _mapper.Map<IEnumerable<CourseDTO>>(pagedCourses);
            var outputModel = new PageInfo<CourseDTO>
            {
                List = listModel,
                Info = new PaginationOutputInfo
                {
                    CurrentPage = pagedCourses.CurrentPage,
                    PageSize = pagedCourses.PageSize,
                    TotalCount = pagedCourses.TotalCount,
                    TotalPages = pagedCourses.TotalPages
                }
            };
            return outputModel;
        }

        public async Task<PageInfo<CourseForAdminDTO>> GetAllCoursesForAdmin(QueryParamsDTO queryParams)
        {
            var courses = _repo.GetAllQueryable();
            if (!string.IsNullOrEmpty(queryParams.Search))
                courses = courses.Where(s => s.CourseName.ToLower().Equals(queryParams.Search.ToLower()));
            if (queryParams.SortBy == "id")
                courses = courses.OrderBy(c => c.Id);
            if (queryParams.SortBy == "courseName")
                courses = courses.OrderBy(c => c.CourseName);
            var pagedCourses = await PagedList<Course>.CreateAsync(courses, queryParams.CurrentPage, queryParams.PageSize);
            var listModel = _mapper.Map<IEnumerable<CourseForAdminDTO>>(pagedCourses);
            var outputModel = new PageInfo<CourseForAdminDTO>
            {
                List = listModel,
                Info = new PaginationOutputInfo
                {
                    CurrentPage = pagedCourses.CurrentPage,
                    PageSize = pagedCourses.PageSize,
                    TotalCount = pagedCourses.TotalCount,
                    TotalPages = pagedCourses.TotalPages
                }
            };
            return outputModel;
        }

        public async Task<CourseDTO> GetCourseById(int id)
        {
            var course = await _repo.GetByIdAsync(id);
            if (course == null)
                return null;
            return _mapper.Map<CourseDTO>(course);
        }

        public IEnumerable<CourseDTO> GetStudentsCourses(int userId)
        {
            var studentsCourses = _usersCoursesRepo.GetAllQueryable().Where(c => c.UserId == userId).ToList();
            return _mapper.Map<IEnumerable<CourseDTO>>(studentsCourses);
        }

        public async Task<Response> RegisterToCourse(int userId, int courseId, DateTime startDate)
        {
            var res = new Response();
            var userInCourse = await _usersCoursesRepo.GetSingleAsync(u => u.UserId == userId && u.CourseId == courseId);
            if (userInCourse == null)
            {
                var userCourse = new UsersCourses { UserId = userId, CourseId = courseId, StartDate = startDate };
                try
                {
                    _usersCoursesRepo.Add(userCourse);
                    res.Successful = true;
                    res.Information = "You have successfully registered to course";
                    _backgroundEmailSender.SendNotificationEmails(userId, courseId);
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