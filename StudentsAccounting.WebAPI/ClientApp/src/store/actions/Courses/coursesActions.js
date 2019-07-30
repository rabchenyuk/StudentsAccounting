import axios from '../../../axios';
import { toast } from "react-toastify";
import {
    COURSES_START,
    COURSES_SUCCESS,
    COURSES_ERROR,
    START_SUBSCRIBING,
    SUBSCRIBE_ERROR,
    SUBSCRIPTION_SUCCESSFULL,
    START_FETCHING_SINGLE_COURSE,
    FETCH_SINGLE_COURSE_SUCCESS,
    FETCH_SINGLE_COURSE_ERROR
} from './coursesTypes';

export const fetchCourses = (currentPage) => {
    return async dispatch => {
        dispatch(startFetchCourses());
        try {
            if (currentPage === undefined) {
                currentPage = 1
            }
            const response = await axios.get('courses/GetCourses', { params: { currentPage } });
            const courses = [];
            const pageInfo = JSON.parse(response.headers.pagination);
            Object.keys(response.data).forEach((key, index) => {
                courses.push({
                    id: response.data[index].id,
                    name: response.data[index].courseName,
                    description: response.data[index].description,
                    imageUrl: response.data[index].imageUrl
                })
            });
            dispatch(fetchCoursesSuccess(courses, pageInfo));
        } catch (e) {
            dispatch(fetchCoursesError(e));
        }
    }
}

export const fetchCourseById = id => {
    return async dispatch => {
        dispatch(startFetchingCourse());
        try {
            const res = await axios.get(`courses/GetCourse/${id}`);
            const course = {
                id: res.data.id,
                courseName: res.data.courseName,
                description: res.data.description,
                imageUrl: res.data.imageUrl
            };
            dispatch(fetchCourseSuccess(course));
        } catch (e) {
            dispatch(fetchCourseError(e));
        }
    }
}

export const startFetchingCourse = () => {
    return {
        type: START_FETCHING_SINGLE_COURSE,
        loading: true,
        course: null
    }
}

export const fetchCourseSuccess = (course) => {
    return {
        type: FETCH_SINGLE_COURSE_SUCCESS,
        course: course,
        loading: false
    }
}

export const fetchCourseError = e => {
    return {
        type: FETCH_SINGLE_COURSE_ERROR,
        loading: false,
        error: e
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

export const subscribeToCourse = (courseId, dt) => {
    const day = dt.getDate();
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();
    const hour = dt.getHours();
    const minute = dt.getMinutes();
    const second = dt.getSeconds();
    
    const startDate = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;
    const token = localStorage.getItem('token');
    const courseData = { courseId, startDate };
    return async dispatch => {
        dispatch(startSubscribing());
        try {
            const res = await axios.post('courses/registerToCourse', courseData, { 'headers': { 'Authorization': 'Bearer ' + token } });
            dispatch(subscribtionSuccessfull(res.data));
            toast.success(res.data, { containerId: 'subscription' });
        } catch (e) {
            dispatch(subscribeError(e.response.data));
            toast.error(e.response.data, { containerId: 'subscription' });
        }
    }
}

export const subscribtionSuccessfull = successMsg => {
    return {
        type: SUBSCRIPTION_SUCCESSFULL,
        loading: false,
        success: successMsg
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