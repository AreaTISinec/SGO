import { useEffect, useState } from "react"
import SidebarV2 from "../../components/SidebarV2/SidebarV2"
import './Facturacion.css'
import { getEmpresas, getAllHistorialFinanciero, getObras } from '../../actions/getPetitions'

const Facturacion = () => {
  const [presupuesto, setPresupuesto] = useState(0);
  const [obras, setObras] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [preEmpresas, setPreEmpresas] = useState({})
  const [avances, setAvances] = useState({})
  const [facturacion, setFacturacion] = useState({})
  const [historialFacturas, setHistorialFacturas] = useState([])
 
  useEffect(()=> {
    getObras(setObras);
    getEmpresas(setEmpresas);
    getAllHistorialFinanciero(setHistorialFacturas)
  }, [])

  useEffect(()=>{
    let sumatoria = 0;
    let sumaEmpresas = {}
    let porcAvances = {}
    let facturacion = {}

    empresas.forEach((empresa) => {
      let sumaTemp = 0;

      let porcAvanceOpTemp = 0;
      let contOp = 0;

      let porcAvanceFinTemp = 0;
      let contFin = 0;

      let sumaFacturas = 0;

      obras?.forEach((obra) => {
        if(obra.empresa === empresa.nombre){
          sumaTemp += obra.presupuesto

          porcAvanceOpTemp += obra.porc_avance_operativo;
          contOp++;

          porcAvanceFinTemp += obra.porc_avance_financiero;
          contFin++;
        }
      })

      historialFacturas.forEach((factura) => {
        if(factura.empresa === empresa.id){
          sumaFacturas += factura.monto;
        }
      })

      facturacion = {
        ...facturacion,
        [empresa.nombre]: sumaFacturas,
      }

      sumaEmpresas = {
        ...sumaEmpresas,
        [empresa.nombre]: sumaTemp,
      }

      porcAvances = {
        ...porcAvances,
        [empresa.nombre]: {
          operativo: porcAvanceOpTemp/contOp,
          financiero: porcAvanceFinTemp/contFin
        }
      }

    })
    
    obras.forEach((obra)=>{
      sumatoria += obra.presupuesto
    })

    setPresupuesto(sumatoria)
    setPreEmpresas(sumaEmpresas)
    setAvances(porcAvances)
    setFacturacion(facturacion)
  }, [obras, empresas, historialFacturas])

  return (
    <div className="facturacion-container">
    <SidebarV2 />
      <div className="recuadro-contenido">
        <h2>VISTA FACTURACION</h2>
        {
          avances.Ekoluz && avances.Sinec && avances.Sinelec && avances.Urbelec ?
        <div>
          <p><strong>Proyectar facturacion</strong> | filtrar?Meses?Clientes?Trabajador? | graficos?semaforo? | ???</p>
            <p>Total presupuestos: $ {presupuesto}</p>
            <h4>Sinec</h4>
            <p >Total presupuesto Sinec: $ {preEmpresas.Sinec} </p>
            <p >Total facturado Sinec: $ {facturacion.Sinec} </p>
            <p >Total por facturar Sinec: $ {preEmpresas.Sinec - facturacion.Sinec} </p>
            <p> (facturado/presupuesto) {(facturacion.Sinec / preEmpresas.Sinec)*100} %</p>
            <p> (Facturado/por Facturar) {(facturacion.Sinec / (preEmpresas.Sinec - facturacion.Sinec))*100} % </p>
            <p>&emsp; Porcentaje Avance Operativo Sinec(media):  {avances.Sinec?.operativo} %</p>
            <p>&emsp;Porcentaje Avance Financiero Sinec(media):  {avances.Sinec?.financiero} %</p>
            <p>&emsp;KPI: {avances.Sinec.operativo/avances.Sinec.financiero}</p>
            <h4>Ekoluz</h4>
            <p >Total presupuesto Ekoluz: $ {preEmpresas.Ekoluz} </p>
            <p>&emsp; Porcentaje Avance Operativo Ekoluz:  {avances.Ekoluz.operativo} %</p>
            <p>&emsp;Porcentaje Avance Financiero Ekoluz:  {avances.Ekoluz.financiero} %</p>
            <p>&emsp;KPI: {avances.Sinec.operativo/avances.Ekoluz.financiero}</p>
            <h4>Urbelec</h4>
            <p >Total presupuesto Urbelec: $ {preEmpresas.Urbelec} </p>
            <p>&emsp; Porcentaje Avance Operativo Urbelec:  {avances.Urbelec.operativo} %</p>
            <p>&emsp;Porcentaje Avance Financiero Urbelec:  {avances.Urbelec.financiero} %</p>
            <p>&emsp;KPI: {avances.Sinec.operativo/avances.Urbelec.financiero}</p>
            <h4>Sinelec</h4>
            <p >Total presupuesto Sinelec: $ {preEmpresas.Sinelec} </p>
            <p>&emsp; Porcentaje Avance Operativo Sinelec:  {avances.Sinelec.operativo} %</p>
            <p>&emsp;Porcentaje Avance Financiero Sinelec:  {avances.Sinelec.financiero} %</p>
            <p>&emsp;KPI: {avances.Sinec.operativo/avances.Sinelec.financiero}</p>
        </div>
          :
          <></>
        }
            
          
          
      </div>
    </div>
  )
}

export default Facturacion
