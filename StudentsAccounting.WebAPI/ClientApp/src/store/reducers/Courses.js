import { COURSES_SUCCESS, COURSES_START, COURSES_ERROR, START_SUBSCRIBING, SUBSCRIPTION_SUCCESSFULL, SUBSCRIBE_ERROR } from "../actions/Courses/coursesTypes";

const initialState = {
    courses: [],
    coursesLoading: false,
    subscribeLoading: false,
    error: null,
    totalPages: [],
    currentPage: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case COURSES_START:
            return {
                ...state,
                coursesLoading: action.loading,
            }
        case COURSES_SUCCESS:
            return {
                ...state,
                courses: action.courses,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                coursesLoading: action.loading
            }
        case COURSES_ERROR:
            return {
                ...state,
                error: action.error,
                coursesLoading: action.loading
            }
        case START_SUBSCRIBING:
            return {
                ...state,
                subscribeLoading: action.loading
            }
        case SUBSCRIBE_ERROR:
            return {
                ...state,
                subscribeLoading: action.loading,
                error: action.error
            }
        case SUBSCRIPTION_SUCCESSFULL:
            return {
                ...state,
                subscribeLoading: action.loading
            }
        default:
            return state;
    }
}