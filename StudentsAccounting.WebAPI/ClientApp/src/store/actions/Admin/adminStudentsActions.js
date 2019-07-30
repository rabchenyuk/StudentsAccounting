import axios from '../../../axios';
import { START_STUDENTS_FETCHING, FETCH_STUDENTS_FAIL, FETCH_STUDENTS_SUCCESS } from './adminTypes';


const convertDate = date => {
    const dateString = new Date(Date.parse(date)).toLocaleDateString();
    const timeString = new Date(Date.parse(date)).toLocaleTimeString();
    return dateString + ' ' + timeString;
}

export const fetchStudents = (sortBy='', isSortAscending = false, search='', currentPage) => {
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
            const students = [];
            Object.keys(res.data).forEach((key, index) => {
                students.push({
                    id: res.data[index].id,
                    email: res.data[index].email,
                    firstName: res.data[index].firstName,
                    lastName: res.data[index].lastName,
                    age: res.data[index].age,
                    gender: res.data[index].gender,
                    registrationDate: convertDate(res.data[index].registrationDate)
                })
            });
            dispatch(fetchSuccess(students, pageInfo));
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