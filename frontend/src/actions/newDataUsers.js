import axios from "axios";


export const uploadDataUser = async (idUsuario, nombre, apellido, celular, empresa) => {
    console.log("estoy aca")

    const body = JSON.stringify({
        "user": idUsuario,
        "nombre": nombre,
        "apellido": apellido,
        "numero": celular,
        "empresa": empresa
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    try {
        const res = await axios.post(`http:/127.0.0.1:8000/api/profile/`, body, config)
    } catch (error) {
        console.log(error.response)
    }
};