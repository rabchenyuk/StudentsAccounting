import axios from '../../../axios';
import { COURSES_START, COURSES_SUCCESS, COURSES_ERROR, START_SUBSCRIBING, SUBSCRIBE_ERROR, SUBSCRIPTION_SUCCESSFULL } from './coursesTypes';

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
                    id: response.data[index].id,
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

export const subscribeToCourse = Id => {
    const token = localStorage.getItem('token');
    const courseData = { Id };
    return async dispatch => {
        dispatch(startSubscribing());
        try {
            await axios.post('/courses/registerToCourse', courseData, { 'headers': { 'Authorization': 'Bearer ' + token } });
            dispatch(subscribtionSuccessfull());
        } catch (e) {
            dispatch(subscribeError(e));
        }
    }
}

export const subscribtionSuccessfull = () => {
    return {
        type: SUBSCRIPTION_SUCCESSFULL,
        loading: false
    }
}

export const startSubscribing = () => {
    return {
        type: START_SUBSCRIBING,
        loading: true
    }
}

export const subscribeError = e => {
    return {
        type: SUBSCRIBE_ERROR,
        loading: false,
        error: e
    }
}