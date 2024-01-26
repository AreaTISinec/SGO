import axios from 'axios'
import { setAlert } from './alert'
import {
    SIGNUP_FAIL,
    SIGNUP_SUCCES,
    LOGIN_FAIL,
    LOGIN_SUCCES,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS
} from './types'


// const getCSRFToken = () => async dispatch => {
//     const csrfCookie = await axios.get('http://127.0.0.1:8000/api/accounts/csrfcookie')
//     console.log(csrfCookie)
//     return csrfCookie

//   };

// export const user = () => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }

// }

export const login = (username, password ) => async dispatch => {
    //getCSRFToken()
    const config = {
        headers: {
            'Content-Type': 'application/json',

            //'X-CSRFToken': getCSRFToken()

        }
    }

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/accounts/token/', body, config);

        if(res.status === 200){
            const token = res.data.token;

            document.cookie = `token=${token}; max-age=${60*60}; path=/`
        }
        

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

           // 'X-CSRFToken': getCSRFToken(),

        }
    }

    const body = JSON.stringify({ username, email, password, re_password, rol });

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/accounts/registrar/', body, config);

        dispatch({
            type: SIGNUP_SUCCES,
            payload: res.data
        });

        //dispatch(login(email, password));
    }catch(err ){
        dispatch({
            type: SIGNUP_FAIL
        });

        dispatch(setAlert('Error al registrar usuario', 'error'));

    }
} 

export const logout = () => async dispatch => {
    console.log(document.cookie)
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'token': ''
        }
    }
    const body = ''
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/accounts/logout/', body, config);

        if (res.status === 200) {
            // Eliminar la cookie del navegador
            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            
            // Despachar una acción de logout exitoso
            dispatch({ type: 'LOGOUT_SUCCESS' });
            
            // Mostrar una alerta de éxito
            dispatch(setAlert('Sesión cerrada exitosamente', 'success'));
        }

        //dispatch(login(email, password));
    }catch(err ){
        dispatch({
            type: LOGOUT_FAIL
        });
    }
    dispatch(setAlert('sesion cerrada exitosamente', 'success'));
    dispatch({ type: LOGOUT_SUCCESS })
}
