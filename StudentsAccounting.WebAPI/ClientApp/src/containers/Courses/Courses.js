import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCourses, subscribeToCourse } from '../../store/actions/Courses/coursesActions';
import CourseCard from '../../components/CourseCard/CourseCard';
import { Grid } from 'semantic-ui-react';
import Pagination from '../../components/Pagination/Pagination';

class Courses extends Component {
    componentDidMount() {
        this.props.fetchCourses();
    }

    render() {
        return (
            <React.Fragment>
                <Grid columns={3}>
                    <Grid.Row>
                        {this.props.coursesList.length === 0 ? <h4>Loading list of courses...</h4> :
                            this.props.coursesList.map((val, index) => {
                                return (
                                    <CourseCard
                                        key={index}
                                        header={val.name}
                                        subscribe={this.props.subscribe}
                                        courseId={val.id}
                                        confirmed={this.props.emailConfirmed}
                                        isAuth={this.props.isAuth}
                                        userRole={this.props.userRole}
                                    />
                                );
                            })
                        }
                    </Grid.Row>
                    {this.props.coursesList.length === 0 ? null :
                        <Pagination
                            currentPage={this.props.currentPage}
                            loadData={this.props.fetchCourses}
                            totalPages={this.props.totalPages} />
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        coursesList: state.courses.courses,
        loading: state.courses.loading,
        totalPages: state.courses.totalPages,
        currentPage: state.courses.currentPage,
        emailConfirmed: state.auth.emailConfirmed,
        isAuth: state.auth.token !== null,
        userRole: state.auth.role
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourses: currentPage => dispatch(fetchCourses(currentPage)),
        subscribe: (Id) => dispatch(subscribeToCourse(Id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);