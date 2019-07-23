import { PROFILE_SUCCESS, PROFILE_START, PROFILE_ERROR } from '../actions/Profile/profileTypes';

const initialState = {
    loading: false,
    error: null,
    firstName: null,
    lastName: null,
    age: null,
    photoUrl: null,
    gender: null,
    registered: null
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
        default:
            return state;
    }
}