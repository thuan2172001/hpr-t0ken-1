import { userContants } from './contants';
import axios from './axios';
import { api } from './config';

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
    console.log(user)
    return async dispatch => {
        dispatch({ type: userContants.USER_UPDATE_PROFILE_REQUEST });
        try {
            const res = await axios.put(`api/user/${user.user._id}`, user);
            console.log(res.data);
            if (res.status === 200) {
                const user = res.data
                console.log(user)
                localStorage.setItem('user', JSON.stringify(user))
                const recentUser = localStorage.getItem('user')
                console.log(recentUser)
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

export const getProfile = (_id) => {
    console.log(_id)
    return async dispatch => {
        dispatch({ type: userContants.USER_GET_PROFILE_REQUEST });
        try {
            const res = await axios.get(`api/user`);
            console.log(res.data);
            if (res.status === 200) {
                const { user } = res.data;
                dispatch({
                    type: userContants.USER_GET_PROFILE_SUCCESS,
                    payload: { user }
                })
            } else {
                dispatch({
                    type: userContants.USER_GET_PROFILE_FAILURE,
                    payload: { error: res.data.errors }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const transferCoin = (props) => {
    console.log(props)
    const t = new Promise((resol, rej) =>{
        const info = {addressTo:props.address, privateKey:props.privateKey, amount:props.amount}
        console.log(info)
        axios.post(`${api}/api/transfer`, info).then((res) =>{
            if (res.status === 200) {
                resol( res.data)
            } else {
                rej( res.data.errors) 
            }
        }).catch(err =>{
            rej( err) 
        });
    })
    return t;
}