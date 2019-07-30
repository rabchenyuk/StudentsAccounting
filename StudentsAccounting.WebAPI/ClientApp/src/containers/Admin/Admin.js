import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { fetchStudents } from '../../store/actions/Admin/adminStudentsActions';
import TableContent from '../../components/Admin/TableContent/TableContent';
import { fetchCourses } from '../../store/actions/Admin/adminCoursesActions';

let sortBy = '';
let isSortAscendingStudents = false;
let isSortAscendingCourses = false;
let search = '';
let currentPage;

class Admin extends Component {
    componentDidMount() {
        this.props.fetchStudents(sortBy, isSortAscendingStudents = true, search);
        this.props.fetchCourses(sortBy, isSortAscendingCourses = true, search);
    }

    loadStudents = (value) => {
        this.props.fetchStudents(sortBy, isSortAscendingStudents, search, currentPage = value);
    }

    loadCourses = (value) => {
        this.props.fetchCourses(sortBy, isSortAscendingCourses, search, currentPage = value);
    }

    sortStudentsBy = (val) => {
        isSortAscendingStudents = !isSortAscendingStudents;
        this.props.fetchStudents(sortBy = val, isSortAscendingStudents, search, this.props.studentsCurrentPage);
    }

    sortCoursesBy = (val) => {
        isSortAscendingCourses = !isSortAscendingCourses;
        this.props.fetchCourses(sortBy = val, isSortAscendingCourses, search, this.props.coursesCurrentPage);
    }

    coursesInputHandler = (val) => {
        this.props.fetchCourses(sortBy, isSortAscendingCourses, search = val, this.props.coursesCurrentPage);
        search = '';
    }

    studentsInputHandler = (val) => {
        this.props.fetchStudents(sortBy, isSortAscendingStudents, search = val, this.props.studentsCurrentPage);
        search = '';
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
            <TableContent
                clickHandler={this.sortStudentsBy}
                currentPage={this.props.studentsCurrentPage}
                totalPages={this.props.studentsTotalPages}
                loadData={this.loadStudents}
                value={this.props.students}
                inputHandler={this.studentsInputHandler}
                resetSearch={this.resetStudentsSearch}
                loading={this.props.studentsLoading}
            />
        );

        let courses = (
            <TableContent
                clickHandler={this.sortCoursesBy}
                currentPage={this.props.coursesCurrentPage}
                totalPages={this.props.coursesTotalPages}
                loadData={this.loadCourses}
                value={this.props.courses}
                inputHandler={this.coursesInputHandler}
                resetSearch={this.resetCoursesSearch}
                loading={this.props.coursesLoading}
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
        coursesTotalPages: state.adminCourses.totalPages,
        coursesLoading: state.adminCourses.loading,
        studentsLoading: state.adminStudents.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStudents: (orderBy, isSortAscendingStudents, search, currentPage) => dispatch(fetchStudents(orderBy, isSortAscendingStudents, search, currentPage)),
        fetchCourses: (orderBy, isSortAscendingCourses, search, currentPage) => dispatch(fetchCourses(orderBy, isSortAscendingCourses, search, currentPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);