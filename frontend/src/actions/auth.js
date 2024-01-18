import axios from 'axios'
import { setAlert } from './alert'
import {
    SIGNUP_FAIL,
    SIGNUP_SUCCES,
    LOGIN_FAIL,
    LOGIN_SUCCES,
    LOGOUT
} from './types'


const getCSRFToken = () => async dispatch => {
    const csrfCookie = await axios.get('http://127.0.0.1:8000/api/accounts/csrfcookie')
    console.log(csrfCookie)
    return csrfCookie
  };

export const login = (email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/accounts/login', body, config);

        dispatch({
            type: LOGIN_SUCCES,
            payload: res.data
        });

        dispatch(setAlert('Authenticated successfully', 'success'));
        
    }catch(err ){
        dispatch({
            type: LOGIN_FAIL
        });

        dispatch(setAlert('Error en  la autentificacion', 'error'));

    }
} 

export const signup = ({ username, email, password, re_password, rol }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        }
    }

    const body = JSON.stringify({ username, email, password, re_password, rol });

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/accounts/registrar', body, config);

        dispatch({
            type: SIGNUP_SUCCES,
            payload: res.data
        });

        dispatch(login(email, password));
    }catch(err ){
        dispatch({
            type: SIGNUP_FAIL
        });

        dispatch(setAlert('Error al registrar usuario', 'error'));

    }
} 

export const logout = () => dispatch => {
    dispatch(setAlert('sesion cerrada exitosamente', 'success'));
    dispatch({ type: LOGOUT })
}