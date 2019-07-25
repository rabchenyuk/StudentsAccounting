import { PROFILE_SUCCESS, PROFILE_START, PROFILE_ERROR, START_FETCHING_USER_COURSES, FETCHING_USER_COURSES_SUCCESS, USER_COURSES_ERROR } from '../actions/Profile/profileTypes';

const initialState = {
    loading: false,
    profileError: null,
    userCoursesError: null,
    firstName: null,
    lastName: null,
    age: null,
    photoUrl: null,
    gender: null,
    registered: null,
    userCourses: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                firstName: action.firstName,
                lastName: action.lastName,
                photoUrl: action.photoUrl,
                gender: action.gender,
                age: action.age,
                registered: action.registered
            }
        case PROFILE_START:
            return {
                ...state,
                loading: action.loading
            }
        case PROFILE_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error
            }
        case START_FETCHING_USER_COURSES:
            return {
                ...state,
                loading: action.loading
            }
        case FETCHING_USER_COURSES_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                userCourses: action.userCourses
            }
        case USER_COURSES_ERROR:
            return {
                ...state,
                loading: action.loading,
                userCoursesError: action.userCoursesError
            }
        default:
            return state;
    }
}