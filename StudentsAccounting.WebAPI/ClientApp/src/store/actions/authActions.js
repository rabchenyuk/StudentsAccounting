import axios from '../../axios';
import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_FAIL, AUTH_START } from '../actions/authTypes';
import jwt from 'jsonwebtoken';

export const auth = (login, password, isLoggedIn) => {
    return async dispatch => {
        dispatch(authStart());
        const authData = { login, password };
        let url = 'auth/register';
        if (isLoggedIn) {
            url = 'auth/login';
        }
        try {
            const response = await axios.post(url, authData);
            const data = response.data;
            const decoded = jwt.decode(data.token);
            localStorage.setItem('token', data.token);
            dispatch(authSuccess(data.token));
            dispatch(autoLogout(decoded.exp));
        } catch (e) {
            dispatch(authFail(e));
        }
    }
}

export const authStart = () => {
    return {
        type: AUTH_START,
        loading: true,
        error: null
    }
}

export const authSuccess = token => {
    return {
        type: AUTH_SUCCESS,
        loading: false,
        token
    }
}

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        loading: false,
        error
    }
}

export const autoLogout = time => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time)
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_LOGOUT
    }
}

export const autoLogin  = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const decoded = jwt.decode(token);
        if (decoded != null) {
            if (!token) {
                dispatch(logout());
            } else {
                if (decoded.exp < new Date().getTime().valueOf / 1000) {
                    dispatch(logout());
                } else {
                    dispatch(authSuccess(token));
                    dispatch(autoLogout(decoded.exp));
                }
            }
        } else {
            dispatch(logout());
        }
    }
}