import {
    COURSES_SUCCESS,
    COURSES_START, COURSES_ERROR,
    START_SUBSCRIBING, SUBSCRIPTION_SUCCESSFULL,
    SUBSCRIBE_ERROR,
    START_FETCHING_SINGLE_COURSE,
    FETCH_SINGLE_COURSE_SUCCESS,
    FETCH_SINGLE_COURSE_ERROR
} from "../actions/Courses/coursesTypes";

const initialState = {
    courses: [],
    loading: false,
    error: null,
    totalPages: [],
    currentPage: null,
    course: null,
    successMsg: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case COURSES_START:
            return {
                ...state,
                loading: action.loading,
                error: null,
                successMsg: null
            }
        case COURSES_SUCCESS:
            return {
                ...state,
                courses: action.courses,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                loading: action.loading,
                error: null,
                successMsg: action.success
            }
        case COURSES_ERROR:
            return {
                ...state,
                error: action.error,
                loading: action.loading,
                successMsg: null
            }
        case START_SUBSCRIBING:
            return {
                ...state,
                loading: action.loading,
                error: null,
                successMsg: null
            }
        case SUBSCRIBE_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: null
            }
        case SUBSCRIPTION_SUCCESSFULL:
            return {
                ...state,
                loading: action.loading,
                error: null,
                successMsg: action.success
            }
        case START_FETCHING_SINGLE_COURSE:
            return {
                ...state,
                loading: action.loading,
                course: action.course,
                successMsg: null,
                error: null
            }
        case FETCH_SINGLE_COURSE_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                course: action.course,
                error: null,
                successMsg: action.success
            }
        case FETCH_SINGLE_COURSE_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: null
            }
        default:
            return state;
    }
}