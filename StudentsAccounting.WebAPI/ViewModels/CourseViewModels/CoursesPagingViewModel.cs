namespace StudentsAccounting.WebAPI.ViewModels.CourseViewModels
{
    public class CoursesPagingViewModel
    {
        private const int MAX_PAGE_SIZE = 4;
        private const int DEFAULT_PAGE_NUMBER = 1;

        private int pageNumber = DEFAULT_PAGE_NUMBER;
        public int PageNumber
        {
            get { return pageNumber; }
            set { pageNumber = (value == 0 || value < 0) ? 1 : value; }
        }

        private int pageSize = MAX_PAGE_SIZE;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MAX_PAGE_SIZE) ? MAX_PAGE_SIZE : value; }
        }
    }
}