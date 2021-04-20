import { userContants } from '../actions/contants';

const initialState = {
    token: null,
    loading: false,
    user: {},
    error: null,
    authenticating: false,
    authenticate: false,
    success: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userContants.USER_SIGN_UP_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userContants.USER_LOG_IN_REQUEST:
            state = {
                ...state,
                loading: true,
                authenticating: true
            }
            break;
        case userContants.USER_SIGN_UP_SUCCESS:
            state = {
                ...state,
                loading: false,
                success: true
            }
            break;
        case userContants.USER_LOG_IN_SUCCESS:
            state = {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
                success: true,
                error: null
            }
            break;
        case userContants.USER_SIGN_UP_FAILURE:
        case userContants.USER_LOG_IN_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;


        case userContants.USER_LOG_OUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;

        case userContants.USER_LOG_OUT_SUCCESS:
            state = {
                ...initialState
            }
            break;

        case userContants.USER_LOG_OUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;

        default:
    }
    return state;
}

export default userReducer;