import {
    PROFILE_SUCCESS,
    PROFILE_START,
    PROFILE_ERROR,
    START_FETCHING_USER_COURSES,
    FETCHING_USER_COURSES_SUCCESS,
    USER_COURSES_ERROR, START_UPDATING,
    UPDATE_PROFILE_ERROR
} from '../actions/Profile/profileTypes';

const initialState = {
    profileLoading: false,
    userCoursesLoading: false,
    profileError: null,
    updateProfileError: null,
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
                profileLoading: action.loading,
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
                profileLoading: action.loading
            }
        case PROFILE_ERROR:
            return {
                ...state,
                profileLoading: action.loading,
                error: action.error
            }
        case START_FETCHING_USER_COURSES:
            return {
                ...state,
                userCoursesLoading: action.loading
            }
        case FETCHING_USER_COURSES_SUCCESS:
            return {
                ...state,
                userCoursesLoading: action.loading,
                userCourses: action.userCourses
            }
        case USER_COURSES_ERROR:
            return {
                ...state,
                userCoursesLoading: action.loading,
                userCoursesError: action.userCoursesError
            }
        case START_UPDATING:
            return {
                ...state,
                profileLoading: action.loading
            }
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                profileLoading: action.loading,
                updateProfileError: action.updateProfileError
            }
        default:
            return state;
    }
}