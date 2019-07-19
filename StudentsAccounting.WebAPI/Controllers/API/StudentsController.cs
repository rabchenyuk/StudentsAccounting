using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentsAccounting.BusinessLogic.Helpers;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.WebAPI.Helpers;
using StudentsAccounting.WebAPI.ViewModels.CourseViewModels;
using StudentsAccounting.WebAPI.ViewModels.StudentViewModels;
using StudentsAccounting.WebAPI.ViewModels.UserViewModels;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StudentsAccounting.WebAPI.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _studentService;
        private readonly IMapper _mapper;

        public StudentsController(IStudentService studentService, IMapper mapper)
        {
            _studentService = studentService;
            _mapper = mapper;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetStudents([FromQuery]StudentQueryViewModel studentViewModel)
        {
            var queryDTO = _mapper.Map<QueryParamsDTO>(studentViewModel);
            var result = await _studentService.GetStudents(queryDTO);
            var studentsList = _mapper.Map<IEnumerable<UserViewModel>>(result.List);
            var pageInfo = result.Info;
            Response.AddPagination(pageInfo.CurrentPage, pageInfo.PageSize, pageInfo.TotalCount, pageInfo.TotalPages);
            return Ok(studentsList);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetStudent(int id)
        {
            var student = await _studentService.GetStudent(id);
            if (student == null)
                return BadRequest("User was not found");
            return Ok(_mapper.Map<UserWithCoursesViewModel>(student));
        }

        [Authorize(Roles = "student")]
        [HttpPost("registerToCourse")]
        public async Task<IActionResult> RegisterToCourse([FromBody]CourseId course)
        {
            string userConfirmed = User.FindFirst(ClaimTypes.IsPersistent).Value;
            if (userConfirmed == "False")
                return BadRequest("Confirm your email to be allowed for subscribtion");
            var res = await _studentService.RegisterToCourse(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), course.Id);
            if(res.Successful)
                return Ok(res.Information);
            return BadRequest(res.Information);
        }
    }
}