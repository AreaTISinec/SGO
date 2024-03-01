import axios from "axios"

export const getEmpresas = async (setEmpresaCallback) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/empresas/')
      setEmpresaCallback(response.data)
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
};

export const getTiposObra = async (setTiposObraCallback) => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/tipos-obra/')
      setTiposObraCallback(res.data)
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
};

export const getEstadosObra = async (setEstadosObraCallback) => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/api/estados-obra/')
        setEstadosObraCallback(res.data)
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getCeNe = async (setCeNeCallback) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/cene/`);
        setCeNeCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getSupervisores = async (setSupervisoresCallback) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/profile/lista/`);
        setSupervisoresCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getClientes = async (setClientesCallback) => {
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/cliente/")
        setClientesCallback(res.data)
    } catch (error) {
        console.error("Error al obtener datos", error)
    }
}

export const getDetalleObra = async (setDetalleObraCallback, idObra) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/obras/${idObra}`);
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
}