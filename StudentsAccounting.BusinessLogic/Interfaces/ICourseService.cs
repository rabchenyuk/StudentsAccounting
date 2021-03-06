﻿using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using StudentsAccounting.BusinessLogic.Helpers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface ICourseService
    {
        Task<CourseDTO> GetCourseById(int id);
        Task<PageInfo<CourseDTO>> GetAllCourses(CoursesPagingDTO paging);
        Task<PageInfo<CourseForAdminDTO>> GetAllCoursesForAdmin(QueryParamsDTO queryParams);
        Task<Response> RegisterToCourse(int userId, int courseId, DateTime startDate);
        IEnumerable<CourseDTO> GetStudentsCourses(int userId);
    }
}