import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCourses } from '../../store/actions/Courses/coursesActions';

class Courses extends Component {
    componentDidMount() {
        this.props.fetchCourses();
    }

    getKeys = () => {
        return Object.keys(this.props.coursesList[0]);
    }

    getHeader = () => {
        const keys = this.getKeys();
        return keys.map((key) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    renderRow = (keys, data) => {
        return keys.map((key) => {
            return <td key={data[key]}>{data[key]}</td>
        })
    }

    getContent = () => {
        var keys = this.getKeys();
        return this.props.coursesList.map((row, index) => {
            return <tr key={index}>{this.renderRow(keys, row)}</tr>
        })
    }

    render() {
        let table = (
            <React.Fragment>
                <table>
                    <thead>
                        <tr>
                            {this.props.coursesList.length > 0 ? this.getHeader() : null}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.coursesList.length > 0 ? this.getContent() : null}
                    </tbody>
                </table>
                <button disabled={this.props.currentPage === 1} onClick={() => this.props.fetchCourses(this.props.currentPage - 1)}>Previous</button>
                {
                    this.props.totalPages.map((val, index) => {
                        return <span key={index}> {val} </span>
                    })
                }
                <button disabled={this.props.totalPages === this.props.currentPage} onClick={() => this.props.fetchCourses(this.props.currentPage + 1)}>Next</button>
            </React.Fragment>
        );

        if (this.props.coursesList.length === 0) {
            table = <h4>Loading list of courses...</h4>
        }

        return (
            <div>
                Courses list:
                {table}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        coursesList: state.courses.courses,
        loading: state.courses.loading,
        totalPages: state.courses.totalPages,
        currentPage: state.courses.currentPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourses: currentPage => dispatch(fetchCourses(currentPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);