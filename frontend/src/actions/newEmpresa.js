import axios from "axios";
import swal from 'sweetalert2'

export const uploadEmpresa = async (nombre) => {
    const body = JSON.stringify({ nombre })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    try {
        const res = await axios.post('https://sgo-django.azurewebsites.net/api/empresas/upload/', body, config)
        console.log(res)
        swal.fire({
            title: "Nueva empresa creada exitosamente",
            icon: "success",
            toast: true,
            timer: 4000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    } catch (error) {
        console.error(error)
        swal.fire({
            title: "Error al crear la nueva empresa",
            icon: "error",
            toast: true,
            timer: 4000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          })
    }
}