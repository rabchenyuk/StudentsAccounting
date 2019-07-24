import axios from '../../../axios';
import { START_COURSES_FETCHING, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAIL } from './adminTypes';

export const fetchCourses = (sortBy='', isSortAscending = false, search='', currentPage) => {
    if (currentPage === undefined) {
        currentPage = 1;
    }
    const token = localStorage.getItem('token');
    return async dispatch => {
        dispatch(startFetching());
        try {
            const res = await axios.get(`courses/GetCoursesForAdmin?sortBy=${sortBy}&isSortAscending=${isSortAscending}&search=${search}&currentPage=${currentPage}`,
                { 'headers': { 'Authorization': 'Bearer ' + token } });
            const pageInfo = JSON.parse(res.headers.pagination);
            const courses = [];
            Object.keys(res.data).forEach((key, index) => {
                courses.push({
                    id: res.data[index].id,
                    courseName: res.data[index].courseName,
                    startDate: res.data[index].startDate
                })
            });
            dispatch(fetchSuccess(courses, pageInfo));
        } catch (e) {
            dispatch(fetchFail(e));
        }
    }
}

export const startFetching = () => {
    return {
        type: START_COURSES_FETCHING,
        loading: true
    }
}

export const fetchSuccess = (courses, pageInfo) => {
    const totalPages = [];
    for (let i = 0; i < pageInfo.totalPages; i++) {
        totalPages.push(i + 1);
    }
    return {
        type: FETCH_COURSES_SUCCESS,
        loading: false,
        courses: courses,
        currentPage: pageInfo.currentPage,
        totalPages: totalPages
    }
}

export const fetchFail = e => {
    return {
        type: FETCH_COURSES_FAIL,
        loading: false,
        error: e
    }
}