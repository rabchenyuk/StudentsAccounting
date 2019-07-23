namespace StudentsAccounting.BusinessLogic.DTO.CourseDTO
{
    public class CoursesPagingDTO
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public string OrderBy { get; set; }
        public bool IsSortAscending { get; set; }
        public string Search { get; set; }
    }
}