﻿using StudentsAccounting.BusinessLogic.Helpers;
using StudentsAccounting.BusinessLogic.Interfaces;
using StudentsAccounting.DataAccess.Entities;
using StudentsAccounting.DataAccess.Interfaces;
using System.Threading.Tasks;
using StudentsAccounting.BusinessLogic.DTO.CourseDTO;
using StudentsAccounting.BusinessLogic.DTO.UserDTO;
using AutoMapper;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System;

namespace StudentsAccounting.BusinessLogic.Services
{
    public class StudentService : IStudentService
    {
        private readonly IRepository<User> _repo;
        private readonly IMapper _mapper;

        public StudentService(IRepository<User> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<PageInfo<UserDTO>> GetStudents(QueryParamsDTO queryParams)
        {
            var students = _repo.GetAll();
            if (!string.IsNullOrEmpty(queryParams.Search))
                students = students.Where(s => s.FirstName.ToLower().Equals(queryParams.Search.ToLower())
                || s.LastName.ToLower().Equals(queryParams.Search.ToLower())
                || (s.FirstName + ' ' + s.LastName).ToLower().Equals(queryParams.Search.ToLower())
                || (s.LastName + ' ' + s.FirstName).ToLower().Equals(queryParams.Search.ToLower()));
            var columnsMap = new Dictionary<string, Expression<Func<User, object>>>
            {
                ["Id"] = s => s.Id,
                ["FirstName"] = s => s.FirstName,
                ["LastName"] = s => s.LastName,
                ["Age"] = s => s.Age,
                ["Email"] = s => s.Email,
                ["RegisteredDate"] = s => s.RegistrationDate
            };
            students = students.ApplyOrdering(queryParams, columnsMap);
            var pagedStudents = await PagedList<User>.CreateAsync(students, queryParams.CurrentPage, queryParams.PageSize);
            var listModel = _mapper.Map<IEnumerable<UserDTO>>(pagedStudents);
            var outputModel = new PageInfo<UserDTO>
            {
                List = listModel,
                Info = new PaginationOutputInfo
                {
                    CurrentPage = pagedStudents.CurrentPage,
                    PageSize = pagedStudents.PageSize,
                    TotalCount = pagedStudents.TotalCount,
                    TotalPages = pagedStudents.TotalPages
                }
            };
            return outputModel;
        }
    }
}