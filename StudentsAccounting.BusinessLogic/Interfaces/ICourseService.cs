using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface ICourseService
    {
        Task<CourseDTO> GetCourseById(int id);
        Task<PageInfo<CourseDTO>> GetAllCourses(CoursesPagingDTO paging);
        Task<PageInfo<CourseForAdminDTO>> GetAllCoursesForAdmin(CoursesPagingDTO paging);
    }
}