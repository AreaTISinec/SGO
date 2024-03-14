import axios from "axios";
import swal from "sweetalert2";


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
        swal.fire({
                title: "Avance subido correctamente",
                icon: "success",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
    } catch (error) {
        console.error(error.response)
        swal.fire({
        title: "A ocurrido un error: ",
        icon: "error",
        toast: true,
        timer: 4000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
    })
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
            swal.fire({
                title: "Avance subido correctamente",
                icon: "success",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } catch (error) {
            console.error(error.response)
            swal.fire({
        title: "A ocurrido un error: ",
        icon: "error",
        toast: true,
        timer: 4000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
    })
        }
    }

}

export const uploadAvanceFinanciero = async (fecha, monto, id_obra, responsable, presupuesto, empresa, numero_factura) => {
    console.log("monto", monto)
    const porcentaje = parseInt((monto/presupuesto)*100)
    console.log("porcentaje historial", porcentaje)

    const body = JSON.stringify({
        fecha,
        monto,
        id_obra,
        responsable,
        porcentaje,
        empresa,
        numero_factura
    })
    console.log(body)

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    try {
        const res = await axios.post('https://sgo-django.azurewebsites.net/api/historial/upload/', body, config)
        swal.fire({
                title: "Avance subido correctamente",
                icon: "success",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        console.log(res)
    } catch (error) {
        console.error(error);
        swal.fire({
        title: "A ocurrido un error: ",
        icon: "error",
        toast: true,
        timer: 4000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
    })
    }
}

