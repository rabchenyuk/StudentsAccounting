﻿namespace StudentsAccounting.BusinessLogic.Helpers
{
    public interface IQueryObject
    {
        string SortBy { get; set; }
        bool IsSortAscending { get; set; }
    }
}
