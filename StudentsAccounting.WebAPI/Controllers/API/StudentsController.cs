using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentsAccounting.BusinessLogic.Helpers;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.WebAPI.Helpers;
using StudentsAccounting.WebAPI.ViewModels.StudentViewModels;
using StudentsAccounting.WebAPI.ViewModels.UserViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentsAccounting.WebAPI.Controllers.API
{
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _studentService;
        private readonly IMapper _mapper;

        public StudentsController(IStudentService studentService, IMapper mapper)
        {
            _studentService = studentService;
            _mapper = mapper;
        }

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
    }
}