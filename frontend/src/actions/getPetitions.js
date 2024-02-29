import axios from "axios"

export const getObra = async (id ,setObraCallback) => {
    try {
          const res = await axios.get(`http://127.0.0.1:8000/api/obras/user/${id}/`);
        setObraCallback(res.data);
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

export  const getObras = async (setObrasCallback) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/obras/`);
        setObrasCallback(res.data);
      }catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getDetalleObra = async (idObra, setDetalleObraCallback) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/obras/${idObra}/`);
        setDetalleObraCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
    
};

export const getEmpresas = async (setEmpresaCallback) => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/api/empresas/')
        setEmpresaCallback(res.data)
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

export const getCeNes = async (setCeNeCallback) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/cene/`);
        setCeNeCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};

export const getCeNe = async (id, setCeNeCallback) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/cene/${id}/`);
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

export const getEncargado = async (idSupervisor ,setSupervisoresCallback) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/profile/${idSupervisor}/`);
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