import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCourses, subscribeToCourse } from '../../store/actions/Courses/coursesActions';
import CourseCard from '../../components/Courses/CourseCard/CourseCard';
import { Grid, Container } from 'semantic-ui-react';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class Courses extends Component {
    componentDidMount() {
        this.props.fetchCourses();
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Grid columns={2}>
                        <Grid.Row centered>
                            {this.props.loading ? <Loader /> :
                                this.props.coursesList.map((val, index) => {
                                    return (
                                        <CourseCard
                                            imageUrl={val.imageUrl}
                                            key={index}
                                            header={val.name}
                                            desc={this.props.coursesList[index].description}
                                            subscribe={this.props.subscribe}
                                            courseId={this.props.coursesList[index].id}
                                            confirmed={this.props.emailConfirmed}
                                            isAuth={this.props.isAuth}
                                            userRole={this.props.userRole}
                                        />
                                    );
                                })
                            }
                        </Grid.Row>
                    </Grid>
                    {this.props.loading ? null :
                        <Container>
                            <Grid>
                                <Grid.Row centered>
                                    <Pagination
                                        currentPage={this.props.currentPage}
                                        loadData={this.props.fetchCourses}
                                        totalPages={this.props.totalPages} />
                                </Grid.Row>
                            </Grid>
                        </Container>
                    }
                </Container>
                <ToastContainer enableMultiContainer containerId={'auth'} autoClose={4000} />
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
        userRole: state.auth.role,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourses: currentPage => dispatch(fetchCourses(currentPage)),
        subscribe: (Id) => dispatch(subscribeToCourse(Id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);