import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_FAIL, AUTH_START } from '../actions/authTypes';

const initialState = {
    token: null,
    error: null,
    loading: false
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
            return { ...state, loading: action.loading }
        case AUTH_SUCCESS:
            return { ...state, token: action.token, loading: action.loading }
        case AUTH_LOGOUT:
            return { ...state, token: null }
        case AUTH_FAIL:
            return { ...state, error: action.error, loading: action.loading }
        default:
            return state;
    }
};