import axios from '../../../axios';
import { START_STUDENTS_FETCHING, FETCH_STUDENTS_FAIL, FETCH_STUDENTS_SUCCESS } from './adminTypes';

export const fetchStudents = (sortBy, isSortAscending = false, search, currentPage) => {
    if (currentPage === undefined) {
        currentPage = 1;
    }
    const token = localStorage.getItem('token');
    return async dispatch => {
        dispatch(startFetching());
        try {
            const res = await axios.get(`students/GetStudentsForAdmin?sortBy=${sortBy}&isSortAscending=${isSortAscending}&search=${search}&currentPage=${currentPage}`,
                { 'headers': { 'Authorization': 'Bearer ' + token } });
            const pageInfo = JSON.parse(res.headers.pagination);
            dispatch(fetchSuccess(res.data, pageInfo));
        } catch (e) {
            dispatch(fetchFail(e));
        }
    }
}

export const startFetching = () => {
    return {
        type: START_STUDENTS_FETCHING,
        loading: true
    }
}

export const fetchFail = e => {
    return {
        type: FETCH_STUDENTS_FAIL,
        loading: false,
        error: e
    }
}

export const fetchSuccess = (students, pageInfo) => {
    const totalPages = [];
    for (let i = 0; i < pageInfo.totalPages; i++) {
        totalPages.push(i + 1);
    }
    return {
        type: FETCH_STUDENTS_SUCCESS,
        loading: false,
        students: students,
        currentPage: pageInfo.currentPage,
        totalPages: totalPages
    }
}