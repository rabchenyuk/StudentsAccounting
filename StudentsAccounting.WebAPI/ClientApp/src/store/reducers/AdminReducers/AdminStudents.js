import { FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_FAIL, START_STUDENTS_FETCHING } from "../../actions/Admin/adminTypes";

const initialState = {
    loading: false,
    error: null,
    students: [],
    totalPages: [],
    currentPage: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_STUDENTS_FETCHING:
            return {
                ...state,
                loading: action.loading
            }
        case FETCH_STUDENTS_FAIL:
            return {
                ...state,
                loading: action.loading,
                error: action.error
            }
        case FETCH_STUDENTS_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                students: action.students,
                totalPages: action.totalPages,
                currentPage: action.currentPage
            }
        default:
            return state;
    }
};