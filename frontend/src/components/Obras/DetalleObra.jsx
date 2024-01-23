import { useParams } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar"
import './DetalleObra.css'
import axios from "axios"
import { useState, useEffect } from "react"

const DetalleObra = () => {
    const idObra = useParams()
    const [detalleObra, setDetalleObra] = useState();

  const getDatos = async () => {
    const {data} = await axios.get(`http://127.0.0.1:8000/api/obras/${idObra.idObra}`)
    //const {data} = ejemplo
    console.log(data)
    setDetalleObra(data)
  }

  useEffect(() => {
    getDatos()
  }, []);
  
  return (
    <div className="DetalleContainer">
        <Sidebar />
        <div className="RecuadroDetalleObra">
             <h1>detalle</h1>
             <div>{detalleObra.fecha_inicio}</div>
        </div>
    </div>
  )
}

export default DetalleObra
