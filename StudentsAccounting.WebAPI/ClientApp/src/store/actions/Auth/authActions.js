import axios from '../../../axios';
import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_FAIL, AUTH_START, REGISTER_START, REGISTER_FAIL, REGISTER_SUCCESS } from '../Auth/authTypes';
import jwt from 'jsonwebtoken';

export const auth = (login, password) => {
    return async dispatch => {
        dispatch(authStart());
        const authData = { login, password };
        try {
            const response = await axios.post('auth/login', authData);
            const data = response.data;
            const decoded = jwt.decode(data.token);
            const userCreds = {
                userId: data.nameid,
                token: data.token,
                role: decoded.role,
                emailConfirmed: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/ispersistent'],
                userName: decoded.unique_name
            }
            localStorage.setItem('token', data.token);
            dispatch(authSuccess(userCreds));
            dispatch(autoLogout(decoded.exp));
        } catch (e) {
            dispatch(authFail(e.response.data));
        }
    }
}

export const register = (login, password) => {
    return async dispatch => {
        dispatch(registerStart());
        const registerData = { login, password };
        try {
            await axios.post('auth/register', registerData);
            dispatch(registerSuccess());
            dispatch(auth(login, password));
        } catch (e) {
            dispatch(registerFail(e.response.data[0].description));
        }
    }
}

export const registerSuccess = () => {
    return {
        type: REGISTER_SUCCESS,
        loading: false
    }
}

export const registerStart = () => {
    return {
        type: REGISTER_START,
        loading: true
    }
}

export const registerFail = (e) => {
    return {
        type: REGISTER_FAIL,
        loading: false,
        error: e
    }
}

export const authStart = () => {
    return {
        type: AUTH_START,
        loading: true,
        error: null
    }
}

export const authSuccess = (userCreds) => {
    return {
        type: AUTH_SUCCESS,
        loading: false,
        token: userCreds.token,
        userName: userCreds.userName,
        role: userCreds.role,
        emailConfirmed: userCreds.emailConfirmed === 'True' ? true : false
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
                    const userCreds = {
                        token: token,
                        role: decoded.role,
                        emailConfirmed: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/ispersistent'],
                        userName: decoded.unique_name
                    }
                    dispatch(authSuccess(userCreds));
                    dispatch(autoLogout(decoded.exp));
                }
            }
        } else {
            dispatch(logout());
        }
    }
}

export const confirm = token => {
    localStorage.setItem('token', token);
    return dispatch => {
        dispatch(autoLogin());
    }
}