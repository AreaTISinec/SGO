import axios from "axios"
import { setAlert } from "./alert";
import { UPLOAD_FAIL, UPLOAD_SUCCES } from "./types";

export const upload = (doc, nombre, tipo) => async dispatch => {
    console.log('holamundo')
    const formData = new FormData();
    formData.append("doc", doc);
    formData.append("nombre", nombre);
    formData.append("tipo", tipo);
    formData.append("id_obra", 1);

    const config = {
      headers: {
          'Content-Type': 'multipart/form-data'
      },
  };
  
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/docs/upload/', formData, config)
      console.log(res)
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



  };