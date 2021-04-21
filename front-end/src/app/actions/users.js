import { userContants } from './contants';
import axios from './axios';

export const register = (user) => {
    console.log(user)
    return async dispatch => {
        dispatch({ type: userContants.USER_SIGN_UP_REQUEST });
        try {
            const res = await axios.post('/api/user', user);
            console.log(res);
            if (res.data.success === true) {
                const { user } = res.data;
                console.log(user);
                dispatch({
                    type: userContants.USER_SIGN_UP_SUCCESS,
                    payload: { user }
                })
            } else {
                dispatch({
                    type: userContants.USER_SIGN_UP_FAILURE,
                    payload: { error: res.data.reason }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const login = (user) => {
    return async dispatch => {
        dispatch({ type: userContants.USER_LOG_IN_REQUEST });
        try {
            const res = await axios.post('/api/auth/login', user);
            console.log(res);
            if (res.data.token) {
                const { user, token } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: userContants.USER_LOG_IN_SUCCESS,
                    payload: { user, token }
                })
            } else {
                dispatch({
                    type: userContants.USER_LOG_IN_FAILURE,
                    payload: { error: res.data.reason }
                })
            }
        } catch (error) {
            dispatch({
                type: userContants.USER_LOG_IN_FAILURE,
                payload: { error: error }
            })
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            dispatch({
                type: userContants.USER_LOG_IN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }
        else {
            dispatch({
                type: userContants.USER_LOG_IN_FAILURE,
                payload: {
                    error: "Login to do some actions"
                }
            });
        }
    }
}

export const logout = () => { 
    return async dispatch => {
        dispatch({ type: userContants.USER_LOG_OUT_REQUEST });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: userContants.USER_LOG_OUT_SUCCESS });
    }
}

export const updateProfile = (user) => {
    return async dispatch => {
        dispatch({ type: userContants.USER_UPDATE_PROFILE_REQUEST });
        try {
            const res = await axios.post('/user/:userId', user);
            console.log(res.data);
            if (res.status === 200) {
                const { user } = res.data;
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: userContants.USER_UPDATE_PROFILE_SUCCESS,
                    payload: { user }
                })
            } else {
                dispatch({
                    type: userContants.USER_UPDATE_PROFILE_FAILURE,
                    payload: { error: res.data.errors }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

