import { useContext, useEffect, useState } from "react";
import SidebarV2 from "../../components/SidebarV2/SidebarV2";
import AuthContext from "../../context/AuthContext"
import axios from "axios";
import "./Home.css";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from 'react-chartjs-2'
import { dataObras, dataFacturacion, dataPorc } from "../../components/Charts/Donuts/donut1";

import Table  from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";
import Carousel from 'react-bootstrap/Carousel';


import ClienteModal from "../../components/Modals/Cliente/ClienteModal";
import EmpresaModal from "../../components/Modals/Empresa/EmpresaModal";
import TipoObrasModal from "../../components/Modals/TipoObras/TipoObrasModal";
import CeneModal from "../../components/Modals/Cene/CeneModal";
import PersonalModal from "../../components/Modals/Personal/PersonalModal";
import EstadoObrasModal from "../../components/Modals/EstadosObra/EstadoObrasModal";
import AddTipoObrasModal from "../../components/Modals/TipoObras/AddTipoObrasModal";
import AddEmpresaModal from "../../components/Modals/Empresa/AddEmpresaModal";
import AddClienteModal from "../../components/Modals/Cliente/AddClienteModal";
import AddCeneModal from "../../components/Modals/Cene/AddCeneModal";

import { getObras } from "../../actions/getPetitions";

ChartJS.register(ArcElement, Tooltip, Legend)


const Home =  () => {
  const { user } = useContext(AuthContext);


  const [showCene, setShowCene] = useState(false)
  const [showAddCene, setShowAddCene] = useState(false)

  const [showCliente, setShowCliente] = useState(false)
  const [showAddCliente, setShowAddCliente] = useState(false)

  const [showEmpresa, setShowEmpresa] = useState(false)
  const [showAddEmpresa, setShowAddEmpresa] = useState(false)

  const [showTipo, setShowTipo] = useState(false)
  const [showAddTipo, setShowAddTipo] = useState(false)

  const [showPersonal, setShowPersonal] = useState(false)

  const [showEstado, setShowEstado] = useState(false)

  const [obras, setObras] = useState([])
  const [contadores, setContadores] = useState({
    obrasTotales: 0,
    obrasAdjudicadas: 0,
    obrasEjecucion: 0,
    obrasParalizadas: 0,
    obrasEjecutadas: 0,
    obrasFinalizadas: 0,
    obrasSinEstado: 0
  })
  const [porcentajes, setPorcentajes] = useState({
    operativo: 0,
    financiero: 0
  })


  const handleShowCene = () => setShowCene(!showCene)
  const handleShowAddCene = () => setShowAddCene(!showAddCene)

  const handleShowCliente = () => setShowCliente(!showCliente)
  const handleShowAddCliente = () => setShowAddCliente(!showAddCliente)

  const handleShowEmpresa = () => setShowEmpresa(!showEmpresa)
  const handleShowAddEmpresa = () => setShowAddEmpresa(!showAddEmpresa)

  const handleShowTipo = () => setShowTipo(!showTipo)
  const handleShowAddTipo = () => setShowAddTipo(!showAddTipo)

  const handleShowPersonal = () => setShowPersonal(!showPersonal)

  const handleShowEstado = () => setShowEstado(!showEstado)

  const getUser = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const body = JSON.stringify({'is_connected': true})
    try {
      const response = await axios.patch(`https://sgo-django.azurewebsites.net/api/accounts/logout/${user.user_id}/`, body, config)
  
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getUser()
    getObras(setObras)
  },[])

  console.log(obras)
  useEffect(()=>{
    let adjudicadas = 0;
    let ejecucion = 0;
    let paralizadas = 0;
    let ejecutadas = 0;
    let finalizadas = 0;
    let sinEstado = 0;

    let acumuladoFinanciero = 0;
    let acumuladoOperativo = 0;

    obras?.forEach((obra)=> {
      if(obra.estado_obra === 'Adjudicada') adjudicadas++;
        
      if(obra.estado_obra === 'En Ejecución') ejecucion++;
        
      if(obra.estado_obra === 'Paralizada') paralizadas++;
      
      if(obra.estado_obra === 'Ejecutada') ejecutadas++;
        
      if(obra.estado_obra === 'Finalizada') finalizadas++;

      if(obra.estado_obra === '') sinEstado++;

      acumuladoFinanciero += obra.porc_avance_financiero;
      acumuladoOperativo += obra.porc_avance_operativo;
        
    });
    setContadores(()=> ({
      obrasAdjudicadas: adjudicadas,
      obrasEjecucion: ejecucion,
      obrasParalizadas: paralizadas,
      obrasEjecutadas: ejecutadas,
      obrasFinalizadas: finalizadas,
      obrasSinEstado: sinEstado,
      obrasTotales: obras.length
    }));

    setPorcentajes(()=>({
      operativo: acumuladoOperativo / obras.length,
      financiero: acumuladoFinanciero / obras.length
    }))

  }, [obras])

  console.log("porcentajes: ", porcentajes)
  return (
    <main className="HomeContainer">
      <SidebarV2 />
      <div className="RecuadrosHome">
        <div className="RecuadroUno">
          <h3>Obras</h3>
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <div className="content">
                <div className="row-content"><strong>Cantidad de obras totales:</strong><span>{contadores.obrasTotales}</span></div>
                <div className="row-content"><strong>Cantidad de obras adjudicadas:</strong><span>{contadores.obrasAdjudicadas}</span></div>
                <div className="row-content"><strong>Cantidad de obras en ejecucion:</strong><span>{contadores.obrasEjecucion}</span></div>
                <div className="row-content"><strong>Cantidad de obras paralizadas:</strong><span>{contadores.obrasParalizadas}</span></div>
                <div className="row-content"><strong>Cantidad de obras ejecutadas:</strong><span>{contadores.obrasEjecutadas}</span></div>
                <div className="row-content"><strong>Cantidad de obras finalizadas:</strong><span>{contadores.obrasFinalizadas}</span></div>
                <div className="row-content"><strong>Cantidad de obras sin estado:</strong><span>{contadores.obrasSinEstado}</span></div>
              </div>
              <div className="chart">
                <Doughnut 
                  data={
                    dataObras(
                      contadores.obrasAdjudicadas, 
                      contadores.obrasEjecucion, 
                      contadores.obrasParalizadas,
                      contadores.obrasEjecutadas,
                      contadores.obrasFinalizadas,
                      contadores.obrasSinEstado
                    )}
                  options={{
                    plugins: {
                      legend:{
                        position: "right"
                      }
                    },
                    responsive: true
                  }}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="content">
                <div className="row-content"><strong>Avance Operativo Promedio:</strong><span>{parseInt(porcentajes.operativo)} %</span></div>
                <div className="row-content"><strong>Avance Financiero Promedio:</strong><span>{parseInt(porcentajes.financiero)} %</span></div>
                
              </div>
              <div className="chart">
                <Doughnut 
                  data={
                    dataPorc(porcentajes.operativo, porcentajes.financiero)
                    }
                  options={{
                    plugins: {
                      legend:{
                        position: "right"
                      }
                    },
                    responsive: true
                  }}
                />
              </div>
            </Carousel.Item>
          </Carousel>
            
        </div>
        <div className="RecuadroDos">
          <h3>Resumen Facturacion</h3>
            <Carousel interval={null} data-bs-theme="dark" defaultActiveIndex={1}>
              <Carousel.Item>
              <div className="content">
                <h4>Mes Anterior</h4>
                <div className="row-content"><strong>Facturacion Proyectada:</strong><span>$ 43.210.400</span></div>
                <div className="row-content"><strong>Total Facturado:</strong><span>$ 42.015.000</span></div>
                <div className="row-content"><strong>Pendiente por Facturar:</strong><span>$ 1.195.400</span></div>
                <div className="row-content"><strong>Porcentaje Proyectado:</strong><span>97,2 %</span></div>
                <div className="row-content"><strong>Porcentaje Pendiente:</strong><span>2,8 %</span></div>
              </div>
              <div className="chart">
                <Doughnut 
                  data={dataFacturacion(43210400, 1195400, 42015000)}
                  options={{
                    plugins: {
                      legend:{
                        position: "right"
                      }
                    }
                  }}
                />
              </div>
              </Carousel.Item>
              <Carousel.Item>
              <div className="content">
                <h4>Mes Actual</h4>
                <div className="row-content"><strong>Facturacion Proyectada:</strong><span>$ 600.210.354</span></div>
                <div className="row-content"><strong>Total Facturado:</strong><span>$ 500.215.420</span></div>
                <div className="row-content"><strong>Pendiente por Facturar:</strong><span>$ 99.994.934</span></div>
                <div className="row-content"><strong>Porcentaje Proyectado:</strong><span>83,3 %</span></div>
                <div className="row-content"><strong>Porcentaje Pendiente:</strong><span>16,6 %</span></div>
              </div>
              <div className="chart">
                <Doughnut 
                  data={dataFacturacion(600210354, 99994934, 500215420)}
                  options={{
                    plugins: {
                      legend:{
                        position: "right"
                      }
                    }
                  }}
                />
              </div>
              </Carousel.Item>
              <Carousel.Item>
              <div className="content">
                <h4>Mes Siguiente</h4>
                <div className="row-content"><strong>Facturacion Proyectada:</strong><span>$ 56.350.000</span></div>
                <div className="row-content"><strong>Total Facturado:</strong><span>$ 0</span></div>
                <div className="row-content"><strong>Pendiente por Facturar:</strong><span>$ 56.350.000</span></div>
                <div className="row-content"><strong>Porcentaje Proyectado:</strong><span>0 %</span></div>
                <div className="row-content"><strong>Porcentaje Pendiente:</strong><span>100 %</span></div>
              </div>
              <div className="chart">
                <Doughnut 
                  data={dataFacturacion(56350000, 56350000, 0)}
                  options={{
                    plugins: {
                      legend:{
                        position: "right"
                      }
                    }
                  }}
                />
              </div>
              </Carousel.Item>
            </Carousel>
        </div>
        <div className="RecuadroTres">
          <h3>Recursos</h3>
          <div className="">
              <Table>
                <tbody>
                <tr>
                  <td>Centro de Negocios</td>
                  <td>
                    <Button variant="secondary" onClick={handleShowCene}>Mostrar Lista</Button>
                    <CeneModal show={showCene} handleShow={handleShowCene}/>
                  </td>
                  <td>
                    <Button variant="danger" onClick={handleShowAddCene}>+</Button>
                    <AddCeneModal show={showAddCene} handleShow={handleShowAddCene}  />
                  </td>
                </tr>

                <tr>
                  <td>Clientes</td>
                  <td>
                    <Button variant="secondary" onClick={handleShowCliente}>Mostrar Lista</Button>
                    <ClienteModal show={showCliente} handleShow={handleShowCliente} />
                  </td>
                  <td>
                    <Button variant="danger" onClick={handleShowAddCliente}>+</Button>
                    <AddClienteModal  show={showAddCliente} handleShow={handleShowAddCliente} />
                  </td>
                </tr>

                <tr>
                  <td>Empresas</td>
                  <td>
                    <Button variant="secondary" onClick={handleShowEmpresa}>Mostrar Lista</Button>
                    <EmpresaModal show={showEmpresa} handleShow={handleShowEmpresa} />
                  </td>
                  <td>
                    <Button variant="danger" onClick={handleShowAddEmpresa}>+</Button>
                    <AddEmpresaModal show={showAddEmpresa} handleShow={handleShowAddEmpresa} />
                  </td>
                </tr>

                <tr>
                  <td>Personal</td>
                  <td>
                    <Button variant="secondary" onClick={handleShowPersonal}>Mostrar Lista</Button>
                    <PersonalModal show={showPersonal} handleShow={handleShowPersonal} />
                  </td>
                  <td></td>
                </tr>

                <tr>
                  <td>Estados de obras</td>
                  <td>
                    <Button variant="secondary" onClick={handleShowEstado}>Mostrar Lista</Button>
                    <EstadoObrasModal show={showEstado} handleShow={handleShowEstado} />
                  </td>
                  <td></td>
                </tr>

                <tr>
                  <td>Tipos de obras</td>
                  <td>
                    <Button variant="secondary" onClick={handleShowTipo}>Mostrar Lista</Button>
                    <TipoObrasModal show={showTipo} handleShow={handleShowTipo} />
                  </td>
                  <td>
                    <Button variant="danger" onClick={handleShowAddTipo}>+</Button>
                    <AddTipoObrasModal  show={showAddTipo} handleShow={handleShowAddTipo} />
                  </td>
                </tr>
                </tbody>
              </Table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
