import axios from "axios";
import swal from "sweetalert2";


export const uploadDataUser = async (user, nombre, apellido, numero, empresa) => {
    user = parseInt(user)
    empresa = parseInt(empresa)
    const data = {
        user,
        nombre,
        apellido,
        numero,
        empresa
    };
    

    try {
        const res = await axios.post("https://sgo-django.azurewebsites.net/api/profile/", data)
        swal.fire({
            title: "Perfil cargado correctamente",
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
};

export const updateDataUser = async (user, nombre, apellido, numero, empresa) => {

    const data = {
        user,
        nombre,
        apellido,
        numero,
        empresa
    };
    

    try {
        const res = await axios.patch(`https://sgo-django.azurewebsites.net/api/profile/update/${user}/`, data)
        swal.fire({
            title: "Perfil actualizado correctamente",
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
};