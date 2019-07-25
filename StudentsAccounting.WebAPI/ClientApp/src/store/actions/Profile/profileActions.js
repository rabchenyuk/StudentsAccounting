import axios from '../../../axios';
import { PROFILE_START, PROFILE_SUCCESS, PROFILE_ERROR, START_FETCHING_USER_COURSES, FETCHING_USER_COURSES_SUCCESS, USER_COURSES_ERROR } from './profileTypes';

export const fetchUserData = token => {
    return async dispatch => {
        dispatch(startFetchingUserData());
        try {
            const userData = await axios.get('profile/GetProfileInfo', { 'headers': { 'Authorization': 'Bearer ' + token } });
            dispatch(fetchProfileSuccess(userData.data));
        } catch (e) {
            dispatch(fetchError(e));
        }
    }
}

export const fetchUserCourses = token => {
    return async dispatch => {
        dispatch(startFetchingUserCourses());
        try {
            const res = await axios.get('courses/getMyCourses', { 'headers': { 'Authorization': 'Bearer ' + token } });
            const userCourses = [];
            Object.keys(res.data).forEach((key, index) => {
                userCourses.push({
                    id: res.data[index].id,
                    name: res.data[index].courseName,
                    startDate: res.data[index].startDate
                })
            });
            dispatch(fetchUserCoursesSuccess(userCourses));
        } catch (e) {
            dispatch(fetchUserCoursesError(e));
        }
    }
}

export const startFetchingUserCourses = () => {
    return {
        type: START_FETCHING_USER_COURSES,
        loading: true
    }
}

export const fetchUserCoursesSuccess = data => {
    return {
        type: FETCHING_USER_COURSES_SUCCESS,
        userCourses: data,
        loading: false
    }
}

export const startFetchingUserData = () => {
    return {
        type: PROFILE_START,
        loading: true
    }
}

export const fetchProfileSuccess = userData => {
    return {
        type: PROFILE_SUCCESS,
        loading: false,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        photoUrl: userData.photoUrl,
        gender: userData.isMale ? "Male" : "Female",
        registered: userData.registrationDate
    }
}

export const fetchError = e => {
    return {
        type: PROFILE_ERROR,
        loading: false,
        profileError: e
    }
}

export const fetchUserCoursesError = e => {
    return {
        type: USER_COURSES_ERROR,
        loading: false,
        userCoursesError: e
    }
}