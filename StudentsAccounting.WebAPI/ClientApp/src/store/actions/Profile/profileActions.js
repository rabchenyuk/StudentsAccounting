import axios from '../../../axios';
import { PROFILE_START, PROFILE_SUCCESS, PROFILE_ERROR } from './profileTypes';
import { startFetchCourses } from '../Courses/coursesActions';

export const fetchUserData = token => {
    return async dispatch => {
        dispatch(startFetchCourses());
        try {
            const userData = await axios.get('/profile/GetProfileInfo', { 'headers': { 'Authorization': 'Bearer ' + token } });
            dispatch(fetchProfileSuccess(userData.data));
        } catch (e) {
            dispatch(fetchError(e));
        }
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
        error: e
    }
}