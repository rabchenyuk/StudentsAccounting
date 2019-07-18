import { COURSES_SUCCESS, COURSES_START, COURSES_ERROR } from "../actions/Courses/coursesTypes";

const initialState = {
    courses: [],
    loading: false,
    error: null,
    totalPages: [],
    currentPage: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case COURSES_START:
            return {
                ...state,
                loading: action.loading,
            }
        case COURSES_SUCCESS:
            return {
                ...state,
                courses: action.courses,
                totalPages: action.totalPages,
                currentPage: action.currentPage
            }
        case COURSES_ERROR:
            return {
                ...state,
                error: action.error,
                loading: action.loading
            }
        default:
            return state;
    }
}