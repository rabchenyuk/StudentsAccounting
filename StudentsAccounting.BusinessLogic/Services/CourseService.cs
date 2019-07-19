using AutoMapper;
using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using StudentsAccounting.BusinessLogic.Helpers;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.DataAccess.Entities;
using StudentsAccounting.DataAccess.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Services
{
    public class CourseService : ICourseService
    {
        private readonly IRepository<Course> _repo;
        private readonly IMapper _mapper;

        public CourseService(IRepository<Course> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<PageInfo<CourseDTO>> GetAllCourses(CoursesPagingDTO paging)
        {
            var courses = _repo.GetAllQueryable();
            var pagedCourses = await PagedList<Course>.CreateAsync(courses, paging.PageNumber, paging.PageSize);
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

        public async Task<PageInfo<CourseForAdminDTO>> GetAllCoursesForAdmin(CoursesPagingDTO paging)
        {
            var courses = _repo.GetAllQueryable();
            var pagedCourses = await PagedList<Course>.CreateAsync(courses, paging.PageNumber, paging.PageSize);
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
    }
}