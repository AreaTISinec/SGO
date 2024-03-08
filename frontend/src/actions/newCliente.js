import axios from "axios";
import swal from "sweetalert2";

export const uploadCliente = async (rut, nombre) => {
    const body = JSON.stringify({ rut, nombre })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    try {
        const res = await axios.post('https://sgo-django.azurewebsites.net/api/cliente/new/upload/', body, config)
        console.log(res)
        swal.fire({
            title: "Nuevo cliente creado exitosamente",
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
            title: "Error al crear el cliente",
            icon: "error",
            toast: true,
            timer: 4000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          })
    }


}