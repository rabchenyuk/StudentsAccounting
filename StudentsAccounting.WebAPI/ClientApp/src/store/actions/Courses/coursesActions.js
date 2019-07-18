import axios from '../../../axios';
import { COURSES_START, COURSES_SUCCESS, COURSES_ERROR } from './coursesTypes';

export const fetchCourses = (pageNumber) => {
    return async dispatch => {
        dispatch(startFetchCourses());
        try {
            if (pageNumber === undefined) {
                pageNumber = 1
            }
            const response = await axios.get('courses/GetCourses', { params: { pageNumber } });
            const courses = [];
            const pageInfo = JSON.parse(response.headers.pagination);
            Object.keys(response.data).forEach((key, index) => {
                courses.push({
                    id: key,
                    name: response.data[index].courseName,
                    startDate: response.data[index].startDate
                })
            });
            dispatch(fetchCoursesSuccess(courses, pageInfo));
        } catch (e) {
            dispatch(fetchCoursesError(e));
        }
    }
}

export const startFetchCourses = () => {
    return {
        type: COURSES_START,
        loading: true
    }
}

export const fetchCoursesSuccess = (courses, pageInfo) => {
    const totalPages = [];
    for (let i = 0; i < pageInfo.totalPages; i++) {
        totalPages.push(i + 1);
    }
    return {
        type: COURSES_SUCCESS,
        courses,
        loading: false,
        currentPage: pageInfo.currentPage,
        totalPages: totalPages
    }
}

export const fetchCoursesError = e => {
    return {
        type: COURSES_ERROR,
        error: e,
        loading: false
    }
}