import axios from "axios";


export const uploadAvanceReal = async (fecha, porcentaje, id_obra) => {

    const tipo = 'real'

    const body = JSON.stringify({
        fecha,
        porcentaje,
        id_obra,
        tipo
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    try {
        const res = await axios.post('https://sgo-django.azurewebsites.net/api/avance/newAvance/', body, config)
    } catch (error) {
        console.log(error.response)
    }
}

export const uploadAvanceProyectado = async (hitos, id_obra) => {

    for(let i =0; i< hitos.length; i++){
        let fecha = hitos[i]['fecha']
        let porcentaje = hitos[i]['porcentaje']
        const tipo = 'proyectado'

        const body = JSON.stringify({
            fecha,
            porcentaje,
            id_obra,
            tipo
        })
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        try {
            const res = await axios.post('https://sgo-django.azurewebsites.net/api/avance/newAvance/', body, config)
        } catch (error) {
            console.log(error.response)
        }
    }

}