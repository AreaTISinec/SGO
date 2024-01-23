import axios from "axios"
import { setAlert } from "./alert";
import { UPLOAD_FAIL, UPLOAD_SUCCES } from "./types";

export const upload_xlxs = ( file ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/ventas/upload', formData, config)

        dispatch({
            type: UPLOAD_SUCCES,
            payload: res.data
        });

        dispatch(setAlert('Archivo subido correctamente', 'success'))
    }catch(err){
        dispatch({
            type: UPLOAD_FAIL 
        });

        dispatch(setAlert('Error al subir arhivo', 'error'))
    }
}
