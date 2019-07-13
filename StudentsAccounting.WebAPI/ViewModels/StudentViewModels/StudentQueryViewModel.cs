namespace StudentsAccounting.WebAPI.ViewModels.StudentViewModels
{
    public class StudentQueryViewModel
    {
        private const int MAX_PAGE_SIZE = 4;
        private const int DEFAULT_PAGE_NUMBER = 1;

        private int currentPage = DEFAULT_PAGE_NUMBER;
        public int CurrentPage
        {
            get { return currentPage; }
            set { currentPage = (value == 0 || value < 0) ? 1 : value; }
        }

        private int pageSize = MAX_PAGE_SIZE;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MAX_PAGE_SIZE) ? MAX_PAGE_SIZE : value; }
        }
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
        public string Search { get; set; }
    }
}