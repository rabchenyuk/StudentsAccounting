﻿using System;

namespace StudentsAccounting.BusinessLogic.DTO.CourseDTO
{
    public class CourseDTO
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}