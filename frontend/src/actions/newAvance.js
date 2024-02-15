import axios from "axios";


export const uploadAvance = async (fecha, porcentaje, id_obra) => {

    const body = JSON.stringify({
        fecha,
        porcentaje,
        id_obra
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/avance/newReal/', body, config)
    } catch (error) {
        console.log(error.response)
    }
}