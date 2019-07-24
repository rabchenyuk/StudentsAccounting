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

    coursesInputHandler = (val) => {
        this.props.fetchCourses(sortBy, isSortAscending, search = val, this.props.coursesCurrentPage);
    }

    studentsInputHandler = (val) => {
        this.props.fetchStudents(sortBy, isSortAscending, search = val, this.props.studentsCurrentPage);
    }

    resetStudentsSearch = () => {
        search = '';
        sortBy = '';
        this.props.fetchStudents();
    }

    resetCoursesSearch = () => {
        search = '';
        sortBy = '';
        this.props.fetchCourses();
    }
        
    render() {
        let students = (
            <Students
                clickHandler={this.sortStudentsBy}
                currentPage={this.props.studentsCurrentPage}
                totalPages={this.props.studentsTotalPages}
                loadStudents={this.loadStudents}
                students={this.props.students}
                inputHandler={this.studentsInputHandler}
                resetSearch={this.resetStudentsSearch}
            />
        );

        let courses = (
            <Courses
                clickHandler={this.sortCoursesBy}
                currentPage={this.props.coursesCurrentPage}
                totalPages={this.props.coursesTotalPages}
                loadCourses={this.loadCourses}
                courses={this.props.courses}
                inputHandler={this.coursesInputHandler}
                resetSearch={this.resetCoursesSearch}
            />
        );

        const panes = [
            {
                menuItem: 'List of students',
                pane:
                    <Tab.Pane key='tab1'>
                        {students}
                    </Tab.Pane>
            },
            {
                menuItem: 'List of courses',
                pane:
                    <Tab.Pane key='tab2'>
                        {courses}
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