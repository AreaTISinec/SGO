import axios from "axios";


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
    } catch (error) {
        console.error(error.response)
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
    } catch (error) {
        console.error(error.response)
    }
};