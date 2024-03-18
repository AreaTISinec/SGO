
import axios from "axios"

export const getObra = async (id ,setObraCallback) => {
    try {
          const res = await axios.get(`https://sgo-django.azurewebsites.net/api/obras/user/${id}/`);
        setObraCallback(res.data);
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

export  const getObras = async (setObrasCallback) => {
    try {
        const res = await axios.get(`https://sgo-django.azurewebsites.net/api/obras/`);
        setObrasCallback(res.data);
      }catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getDetalleObra = async (idObra, setDetalleObraCallback) => {
    try {
        const res = await axios.get(`https://sgo-django.azurewebsites.net/api/obras/${idObra}/`);
        setDetalleObraCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
    
};

export const getEmpresas = async (setEmpresaCallback) => {
    try {
        const res = await axios.get('https://sgo-django.azurewebsites.net/api/empresas/')
        setEmpresaCallback(res.data)
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getTiposObra = async (setTiposObraCallback) => {
    try {
        const res = await axios.get('https://sgo-django.azurewebsites.net/api/tipos-obra/')
        setTiposObraCallback(res.data)
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getEstadosObra = async (setEstadosObraCallback) => {
    try {
        const res = await axios.get('https://sgo-django.azurewebsites.net/api/estados-obra/')
        setEstadosObraCallback(res.data)
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getCeNes = async (setCeNeCallback) => {
    try {
        const res = await axios.get(`https://sgo-django.azurewebsites.net/api/cene/`);
        setCeNeCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getCeNe = async (id, setCeNeCallback) => {
    try {
        const res = await axios.get(`https://sgo-django.azurewebsites.net/api/cene/${id}/`);
        setCeNeCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getSupervisores = async (setSupervisoresCallback) => {
    try {
        const res = await axios.get(`https://sgo-django.azurewebsites.net/api/profile/lista/`);
        setSupervisoresCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getEncargado = async (idSupervisor ,setSupervisoresCallback) => {
    try {
        const res = await axios.get(`https://sgo-django.azurewebsites.net/api/profile/${idSupervisor}/`);
        setSupervisoresCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getClientes = async (setClientesCallback) => {
    try {
        const res = await axios.get("https://sgo-django.azurewebsites.net/api/cliente/")
        setClientesCallback(res.data)
    } catch (error) {
        console.error("Error al obtener datos", error)
    }
}


export const getHistorialFinanciero = async (setHistorialFinancieroCallback, idObra) => {
    try {
        const { data } = await axios.get(`https://sgo-django.azurewebsites.net/api/historial/${idObra}/`)
        setHistorialFinancieroCallback(data)
    } catch (error) {
        console.error(error)
    }
}

export const getProfile = async ( idProfile) => {
    try {
        const { data } = await axios.get(`https://sgo-django.azurewebsites.net/api/profile/${idProfile}/`)
        return(data)
    } catch (error) {
        console.error(error)
    }
}

export const getAvances = async ( idObra, setAvancesCallback ) => {
    try {
        const { data } = await axios.get(`https://sgo-django.azurewebsites.net/api/avance/list/${idObra}/`)
        setAvancesCallback(data.sort((a,b) => new Date(a.fecha) - new Date(b.fecha)))
    } catch (error) {
        console.error(error)
    }
}

export const getAccessToken = async (setAccessTokenCallback) => {

    try {
        const { data } = await axios.get("https://sgo-django.azurewebsites.net/api/powerbi/getAccessToken/")
        setAccessTokenCallback(data)
    }catch(error){
        console.error(error)
    }
}