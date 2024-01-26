import {
    SIGNUP_FAIL,
    SIGNUP_SUCCES,
    LOGIN_FAIL,
    LOGIN_SUCCES,
    //LOGOUT_FAIL,
    LOGOUT_SUCCESS
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false
}

export default function(state = initialState, action){
    const {type, payload } = action;

    //console.log(payload.access)
    
    switch(type){
        case LOGIN_SUCCES:
            localStorage.setItem('token', payload.access);
            console.log(payload.access)
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                token: payload.access
            }
        case SIGNUP_SUCCES:
            return {
                ...state,
                isAuthenticated: false,
                loading: true
            }
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}