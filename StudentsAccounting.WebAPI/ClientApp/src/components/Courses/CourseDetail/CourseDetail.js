import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCourseById, subscribeToCourse } from '../../../store/actions/Courses/coursesActions';
import { Container, Grid, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../UI/Loader/Loader';

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: this.getMinDate()
        };
    }

    componentDidMount() {
        this.props.fetchCourseById(this.props.match.params.id);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    getMinDate = () => {
        const date = new Date();
        const tomorrow = new Date(date.getFullYear(), date.getMonth(), (date.getDate() + 1));
        return tomorrow;
    }

    render() {
        return (
            <React.Fragment>
                {this.props.course === null || this.props.loading ? <Loader /> :
                    <Container>
                        <Grid container stackable>
                            <Grid.Row centered>
                                <Grid.Column width={8}>
                                    <div>
                                        <p>{this.props.course.courseName}</p>
                                        <p>{this.props.course.description}</p>
                                    </div>
                                    {
                                        this.props.isAuth && this.props.userRole !== 'admin' ?
                                            <React.Fragment>
                                                <DatePicker
                                                    minDate={this.getMinDate()}
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChange.bind(this)}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    dateFormat="yyyy MMM, d h:mm aa"
                                                    timeCaption="time"
                                                />
                                                <Button
                                                    disabled={!this.props.confirmed}
                                                    content={this.props.confirmed ? 'Subscribe' : 'Confirm your account'}
                                                    primary
                                                    onClick={() => this.props.subscribe(this.props.course.id, this.state.startDate)}
                                                />
                                            </React.Fragment>
                                            : null
                                    }
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                }
                <ToastContainer enableMultiContainer containerId={'subscription'} autoClose={4000} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        course: state.courses.course,
        loading: state.courses.loading,
        isAuth: state.auth.token !== null,
        confirmed: state.auth.emailConfirmed,
        userRole: state.auth.role,
        error: state.courses.error,
        success: state.courses.successMsg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseById: id => dispatch(fetchCourseById(id)),
        subscribe: (id, startDate) => dispatch(subscribeToCourse(id, startDate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail);