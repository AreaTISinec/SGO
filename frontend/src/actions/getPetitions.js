import axios from "axios"

<<<<<<< HEAD
export const getEmpresas = async (setEmpresaCallback) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/empresas/')
      setEmpresaCallback(response.data)
    } catch (err) {
      console.error("Error al obtener datos:", err);
=======
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
>>>>>>> d5a6a40277675fee07c205cb896d24a993b2b6fb
    }
};

export const getTiposObra = async (setTiposObraCallback) => {
    try {
<<<<<<< HEAD
      const res = await axios.get('http://127.0.0.1:8000/api/tipos-obra/')
      setTiposObraCallback(res.data)
    } catch (err) {
      console.error("Error al obtener datos:", err);
=======
        const res = await axios.get('https://sgo-django.azurewebsites.net/api/tipos-obra/')
        setTiposObraCallback(res.data)
    } catch (err) {
        console.error("Error al obtener datos:", err);
>>>>>>> d5a6a40277675fee07c205cb896d24a993b2b6fb
    }
};

export const getEstadosObra = async (setEstadosObraCallback) => {
    try {
<<<<<<< HEAD
        const res = await axios.get('http://127.0.0.1:8000/api/estados-obra/')
=======
        const res = await axios.get('https://sgo-django.azurewebsites.net/api/estados-obra/')
>>>>>>> d5a6a40277675fee07c205cb896d24a993b2b6fb
        setEstadosObraCallback(res.data)
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

<<<<<<< HEAD
export const getCeNe = async (setCeNeCallback) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/cene/`);
=======
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
>>>>>>> d5a6a40277675fee07c205cb896d24a993b2b6fb
        setCeNeCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getSupervisores = async (setSupervisoresCallback) => {
    try {
<<<<<<< HEAD
        const res = await axios.get(`http://127.0.0.1:8000/api/profile/lista/`);
=======
        const res = await axios.get(`https://sgo-django.azurewebsites.net/api/profile/lista/`);
        setSupervisoresCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getEncargado = async (idSupervisor ,setSupervisoresCallback) => {
    try {
        const res = await axios.get(`https://sgo-django.azurewebsites.net/api/profile/${idSupervisor}/`);
>>>>>>> d5a6a40277675fee07c205cb896d24a993b2b6fb
        setSupervisoresCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getClientes = async (setClientesCallback) => {
    try {
<<<<<<< HEAD
        const res = await axios.get("http://127.0.0.1:8000/api/cliente/")
=======
        const res = await axios.get("https://sgo-django.azurewebsites.net/api/cliente/")
>>>>>>> d5a6a40277675fee07c205cb896d24a993b2b6fb
        setClientesCallback(res.data)
    } catch (error) {
        console.error("Error al obtener datos", error)
    }
<<<<<<< HEAD
}

export const getDetalleObra = async (setDetalleObraCallback, idObra) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/obras/${idObra}/`);
        setDetalleObraCallback(data)
    } catch (error) {
        console.error(error)
    }
  };


export const getHistorialFinanciero = async (setHistorialFinancieroCallback, idObra) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/historial/${idObra}/`)
        setHistorialFinancieroCallback(data)
    } catch (error) {
        console.log(error)
    }
}

export const getProfile = async ( idProfile) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/profile/${idProfile}/`)
        return(data)
    } catch (error) {
        console.log(error)
    }
=======
>>>>>>> d5a6a40277675fee07c205cb896d24a993b2b6fb
}