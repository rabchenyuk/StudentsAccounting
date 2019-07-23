import { START_COURSES_FETCHING, FETCH_COURSES_FAIL, FETCH_COURSES_SUCCESS } from "../../actions/Admin/adminTypes";

const initialState = {
    loading: false,
    courses: [],
    error: null,
    currentPage: null,
    totalPages: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_COURSES_FETCHING:
            return {
                ...state,
                loading: action.loading
            }
        case FETCH_COURSES_FAIL:
            return {
                ...state,
                loading: action.loading,
                error: action.error
            }
        case FETCH_COURSES_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                courses: action.courses,
                totalPages: action.totalPages,
                currentPage: action.currentPage
            }
        default:
            return state;
    }
};