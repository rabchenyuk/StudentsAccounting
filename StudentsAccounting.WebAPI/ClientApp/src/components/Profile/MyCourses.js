import React, { Component } from 'react';
import CourseCard from '../Courses/CourseCard/CourseCard';
import { connect } from 'react-redux';
import { fetchUserCourses } from '../../store/actions/Profile/profileActions';
import Loader from '../UI/Loader/Loader';

const convertDate = date => {
    const dateString = new Date(Date.parse(date)).toLocaleDateString();
    const timeString = new Date(Date.parse(date)).toLocaleTimeString();
    return dateString + ' ' + timeString;
}

class MyCourses extends Component {
    componentDidMount() {
        this.props.getUserCourses(this.props.token);
    }

    renderCourses = () => {
        let courses = null;
        if (this.props.myCourses.length === 0) {
            courses = <h1 style={{ textAlign: 'center' }}>You haven't subscribed to any course</h1>;
        }
        if (this.props.myCourses.length > 0) {
            courses = this.props.myCourses.map((val, index) => {
                return (
                    <CourseCard
                        courseId={val.id}
                        key={val + index}
                        header={val.name}
                        date={convertDate(val.startDate)}
                    />)
            });
        }
        return courses;
    }

    render() {
        return (
            <React.Fragment>
                {this.props.loading ? <Loader /> : this.renderCourses()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        myCourses: state.profile.userCourses,
        loading: state.profile.userCoursesLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserCourses: token => dispatch(fetchUserCourses(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCourses);