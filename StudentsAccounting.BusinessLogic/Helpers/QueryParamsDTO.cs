namespace StudentsAccounting.BusinessLogic.Helpers
{
    public class QueryParamsDTO : PaginationOutputInfo, IQueryObject
    {
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
        public string Search { get; set; }
    }
}