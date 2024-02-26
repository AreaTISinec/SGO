import axios from "axios";


export const uploadDataUser = async (user, nombre, apellido, numero, empresa) => {
    console.log("estoy aca")
    user = parseInt(user)
    empresa = parseInt(empresa)
    const data = {
        user,
        nombre,
        apellido,
        numero,
        empresa
    };
    
    console.log(data)

    try {
        const res = await axios.post("http://127.0.0.1:8000/api/profile/", data)
    } catch (error) {
        console.log(error.response)
    }
};

export const updateDataUser = async (user, nombre, apellido, numero, empresa) => {
    console.log("estoy aca")

    const data = {
        user,
        nombre,
        apellido,
        numero,
        empresa
    };
    
    console.log(data)

    try {
        const res = await axios.patch(`http://127.0.0.1:8000/api/profile/update/${user}/`, data)
    } catch (error) {
        console.log(error.response)
    }
};