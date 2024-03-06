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
        console.error(error.response)
    }
}

export const uploadAvanceProyectado = async (hitos, id_obra) => {
    console.log(hitos)
    for(let i =1; i< hitos.length; i++){
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
            console.error(error.response)
        }
    }

}

export const uploadAvanceFinanciero = async (fecha, monto, id_obra, responsable) => {
    const body = JSON.stringify({
        fecha,
        monto,
        id_obra,
        responsable
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    try {
        const res = await axios.post('https://sgo-django.azurewebsites.net/api/historial/upload/', body, config)
        console.log(res)
    } catch (error) {
        console.error(error)
    }
}

