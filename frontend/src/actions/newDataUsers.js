import axios from "axios";


export const uploadDataUser = async (idUsuario, nombre, apellido, celular, empresa) => {

    const body = JSON.stringify({
        nombre,
        apellido,
        celular,
        empresa
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    try {
        const res = await axios.post(`http:/127.0.0.1:8000/api/profile/${idUsuario}/`, body, config)
    } catch (error) {
        console.log(error.response)
    }
};