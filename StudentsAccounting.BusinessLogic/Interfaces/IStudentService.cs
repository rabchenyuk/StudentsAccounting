using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using StudentsAccounting.BusinessLogic.DTO.UserDTO;
using StudentsAccounting.BusinessLogic.Helpers;
using System.Threading.Tasks;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface IStudentService
    {
        Task<PageInfo<UserDTO>> GetStudents(QueryParamsDTO filters);
        Task<UserWithCoursesDTO> GetStudent(int id);
        Task<Response> RegisterToCourse(int userId, int courseId);
    }
}