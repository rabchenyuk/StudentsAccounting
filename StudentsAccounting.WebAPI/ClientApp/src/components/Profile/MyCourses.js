import React, { Component } from 'react';
import CourseCard from '../CourseCard/CourseCard';

class MyCourses extends Component {
    componentDidMount() {
        this.props.getUserCourses();
    }

    render() {
        const coursesCards = this.props.userCourses.map((val, index) => {
            return (
                <CourseCard
                    key={val + index}
                    header={val.name}
                    startDate={val.startDate}
                />)
        });

        return (
            <React.Fragment>
                {this.props.userCourses.length === 0 ? <h1>Loading courses</h1> : coursesCards}
            </React.Fragment>
        );
    }
}

export default MyCourses;