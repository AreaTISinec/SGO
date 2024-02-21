import axios from "axios";


export const uploadAvanceReal = async (fecha, porcentaje, id_obra) => {

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

export const uploadAvanceProyectado = async (hitos, id_obra) => {

    for(let i =0; i< hitos.length; i++){
        let fecha = hitos[i]['fecha']
        let porcentaje = hitos[i]['porcentaje']

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
            const res = await axios.post('http://127.0.0.1:8000/api/avance/newProyec/', body, config)
        } catch (error) {
            console.log(error.response)
        }
    }

}