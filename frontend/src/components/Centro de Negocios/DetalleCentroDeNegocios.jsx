import { useParams } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar"
import './DetalleCentroDeNegocios.css'
import axios from "axios"
import { useState, useEffect } from "react"

const DetalleCentroDeNegocios = () => {
    const idCentroDeNegocios = useParams()
    const [detalleCentroDeNegocios, setDetalleCentroDeNegocios] = useState();

  const getDatos = async () => {
    const {data} = await axios.get(`http://127.0.0.1:8000/api/cene/search/${idCentroDeNegocios}`)
    //const {data} = ejemplo
    console.log(data)
    setDetalleCentroDeNegocios(data)
  }

  useEffect(() => {
    getDatos()
  }, []);
  
  return (
    <div className="DetalleCentroNegociosContainer">
        <Sidebar />
        <div className="RecuadroDetalleCentroNegocios">
             <h1>detalle</h1>
             <div>{detalleCentroDeNegocios.fecha_inicio}</div>
        </div>
    </div>
  )
}

export default DetalleCentroDeNegocios
