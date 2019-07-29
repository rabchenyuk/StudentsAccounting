import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_FAIL, AUTH_START, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_START } from '../actions/Auth/authTypes';

const initialState = {
    userId: null,
    token: null,
    role: null,
    emailConfirmed: null,
    userName: null,
    error: null,
    loading: false
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
            return { ...state, loading: action.loading, error: null }
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                role: action.role,
                emailConfirmed: action.emailConfirmed,
                userName: action.userName,
                error: null,
                loading: action.loading
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                role: null,
                emailConfirmed: null,
                userName: null,
                userId: null,
                error: null,
                loading: action.loading
            }
        case AUTH_FAIL:
            return { ...state, error: action.error, loading: action.loading }
        case REGISTER_START:
            return {
                ...state,
                loading: action.loading,
                error: null
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                error: null
            }
        case REGISTER_FAIL:
            return {
                ...state,
                loading: action.loading,
                error: action.error
            }
        default:
            return state;
    }
};