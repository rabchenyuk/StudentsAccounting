import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { fetchStudents } from '../../store/actions/Admin/adminStudentsActions';
import Students from '../../components/Admin/Students/Students';
import Courses from '../../components/Admin/Courses/Courses';
import Pagination from '../../components/Pagination/Pagination';
import { fetchCourses } from '../../store/actions/Admin/adminCoursesActions';

let sortBy = '';
let isSortAscending = null;
let search = '';
let currentPage = null;

class Admin extends Component {
    componentDidMount() {
        this.props.fetchStudents(sortBy, isSortAscending = true, search);
        this.props.fetchCourses(sortBy, isSortAscending = true, search);
    }

    loadStudents = (value) => {
        this.props.fetchStudents(sortBy, isSortAscending = true, search, currentPage = value);
    }

    loadCourses = (value) => {
        this.props.fetchCourses(sortBy, isSortAscending = true, search, currentPage = value);
    }

    sortStudentsBy = (val) => {
        this.props.fetchStudents(sortBy = val, isSortAscending, search, this.props.studentsCurrentPage);
    }

    sortCoursesBy = (val) => {
        this.props.fetchCourses(sortBy = val, isSortAscending, search, this.props.coursesCurrentPage);
    }
        
    render() {
        console.log(this.props);
        let studentsPagination = (
            <Pagination
                currentPage={this.props.studentsCurrentPage}
                loadData={this.loadStudents}
                totalPages={this.props.studentsTotalPages} />
        );

        let coursesPagination = (
            <Pagination
                currentPage={this.props.coursesCurrentPage}
                loadData={this.loadCourses}
                totalPages={this.props.coursesTotalPages} />
        );

        let students = (
            <Students
                clickHandler={this.sortStudentsBy}
                currentPage={this.props.studentsCurrentPage}
                totalPages={this.props.studentsTotalPages}
                students={this.props.students} />
        );

        let courses = (
            <Courses
                clickHandler={this.sortCoursesBy}
                currentPage={this.props.coursesCurrentPage}
                totalPages={this.props.coursesTotalPages}
                courses={this.props.courses}
            />
        );

        if (this.props.students.length === 0) {
            students = <h4>Loading list of students...</h4>;
            studentsPagination = null;
        }

        if (this.props.courses.length === 0) {
            courses = <h4>Loading list of courses...</h4>
            coursesPagination = null;
        }

        const panes = [
            {
                menuItem: 'List of students',
                pane:
                    <Tab.Pane key='tab1'>
                        {students}
                        {studentsPagination}
                    </Tab.Pane>
            },
            {
                menuItem: 'List of courses',
                pane:
                    <Tab.Pane key='tab2'>
                        {courses}
                        {coursesPagination}
                    </Tab.Pane>
            },
        ];

        return (
            <Tab panes={panes} renderActiveOnly={false} />
        );
    }
}

const mapStateToProps = state => {
    return {
        students: state.adminStudents.students,
        studentsCurrentPage: state.adminStudents.currentPage,
        studentsTotalPages: state.adminStudents.totalPages,
        courses: state.adminCourses.courses,
        coursesCurrentPage: state.adminCourses.currentPage,
        coursesTotalPages: state.adminCourses.totalPages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStudents: (orderBy, isSortAscending, search, currentPage) => dispatch(fetchStudents(orderBy, isSortAscending, search, currentPage)),
        fetchCourses: (orderBy, isSortAscending, search, currentPage) => dispatch(fetchCourses(orderBy, isSortAscending, search, currentPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);