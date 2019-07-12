using StudentsAccounting.BusinessLogic.Helpers;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentsAccounting.BusinessLogic.DTO.CourseDTO
{
    public class PageInfo<T> where T : class
    {
        public IEnumerable<T> List { get; set; }
        public PaginationOutputInfo Info { get; set; }
    }
}