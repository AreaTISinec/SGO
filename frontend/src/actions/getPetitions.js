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
        const res = await axios.get(`http://127.0.0.1:8000/api/profile/`);
        setSupervisoresCallback(res.data);
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
};