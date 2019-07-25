using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.WebAPI.ViewModels.CourseViewModels;
using System.Threading.Tasks;
using StudentsAccounting.WebAPI.Helpers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using StudentsAccounting.BusinessLogic.Helpers;

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
        public async Task<IActionResult> GetCoursesForAdmin([FromQuery]CoursesQueryViewModel coursesViewModel)
        {
            var courses = _mapper.Map<QueryParamsDTO>(coursesViewModel);
            var result = await _courseService.GetAllCoursesForAdmin(courses);
            var pageInfo = result.Info;
            var coursesList = _mapper.Map<IEnumerable<CourseForAdminViewModel>>(result.List);
            Response.AddPagination(pageInfo.CurrentPage, pageInfo.PageSize, pageInfo.TotalCount, pageInfo.TotalPages);
            return Ok(coursesList);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCourses([FromQuery]CoursesQueryViewModel pagingViewModel)
        {
            var paging = _mapper.Map<CoursesPagingDTO>(pagingViewModel);
            var result = await _courseService.GetAllCourses(paging);
            var pageInfo = result.Info;
            var coursesList = _mapper.Map<IEnumerable<CourseViewModel>>(result.List);
            Response.AddPagination(pageInfo.CurrentPage, pageInfo.PageSize, pageInfo.TotalCount, pageInfo.TotalPages);
            return Ok(coursesList);
        }

        [Authorize(Roles = "student")]
        [HttpPost("registerToCourse")]
        public async Task<IActionResult> RegisterToCourse([FromBody]CourseId course)
        {
            string userConfirmed = User.FindFirst(ClaimTypes.IsPersistent).Value;
            if (userConfirmed == "False")
                return BadRequest("Confirm your email to be allowed for subscribtion");
            var res = await _courseService.RegisterToCourse(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), course.Id);
            if (res.Successful)
                return Ok(res.Information);
            return BadRequest(res.Information);
        }

        [Authorize(Roles = "student")]
        [HttpGet("getMyCourses")]
        public IActionResult GetStudentsCourses()
        {
            var courses = _courseService.GetStudentsCourses(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));
            if (courses == null)
                return BadRequest("You haven't subscribed to any course yet");
            return Ok(_mapper.Map<IEnumerable<CourseViewModel>>(courses));
        }
    }
}