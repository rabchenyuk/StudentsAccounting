using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.WebAPI.ViewModels.CourseViewModels;
using System.Threading.Tasks;
using StudentsAccounting.WebAPI.Helpers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace StudentsAccounting.WebAPI.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly IMapper _mapper;

        public CoursesController(ICourseService courseService, IMapper mapper)
        {
            _courseService = courseService;
            _mapper = mapper;
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetCourse(int id)
        {
            var course = await _courseService.GetCourseById(id);
            if (course == null)
                return BadRequest("No such course");
            return Ok(_mapper.Map<CourseViewModel>(course));
        }

        [Authorize(Roles = "admin")]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetCoursesForAdmin([FromQuery]CoursesPagingViewModel pagingViewModel)
        {
            var paging = _mapper.Map<CoursesPagingDTO>(pagingViewModel);
            var result = await _courseService.GetAllCoursesForAdmin(paging);
            var pageInfo = result.Info;
            var coursesList = _mapper.Map<IEnumerable<CourseForAdminViewModel>>(result.List);
            Response.AddPagination(pageInfo.CurrentPage, pageInfo.PageSize, pageInfo.TotalCount, pageInfo.TotalPages);
            return Ok(coursesList);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCourses([FromQuery]CoursesPagingViewModel pagingViewModel)
        {
            var paging = _mapper.Map<CoursesPagingDTO>(pagingViewModel);
            var result = await _courseService.GetAllCourses(paging);
            var pageInfo = result.Info;
            var coursesList = _mapper.Map<IEnumerable<CourseViewModel>>(result.List);
            Response.AddPagination(pageInfo.CurrentPage, pageInfo.PageSize, pageInfo.TotalCount, pageInfo.TotalPages);
            return Ok(coursesList);
        }
    }
}