import { useContext, useEffect, useState } from "react";
import SidebarV2 from "../../components/SidebarV2/SidebarV2";
import AuthContext from "../../context/AuthContext"
import axios from "axios";
import "./Home.css";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from 'react-chartjs-2'
import { dataObras, dataFacturacion } from "../../components/Charts/Donuts/donut1";

import Table  from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from "react-bootstrap/Button";

import { getCeNes, getSupervisores, getClientes, getEmpresas, getTiposObra, getEstadosObra } from "../../actions/getPetitions";

ChartJS.register(ArcElement, Tooltip, Legend)


const Home =  () => {
  const { user } = useContext(AuthContext);

  const [cenes, setCenes] = useState([])
  const [personal ,setPersonal] = useState([])
  const [clientes, setClientes] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [tiposObra, setTiposObra] = useState([])
  const [estadosObra, setEstadosObra] = useState([])

  useEffect

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
    getCeNes(setCenes)
    getSupervisores(setPersonal)
    getClientes(setClientes)
    getEmpresas(setEmpresas)
    getTiposObra(setTiposObra)
    getEstadosObra(setEstadosObra)
  },[])
  return (
    <main className="HomeContainer">
      <SidebarV2 />
      <div className="RecuadrosHome">
        <div className="RecuadroUno">
          <h3>Obras</h3>
          <div className="content">
            <div className="row-content"><strong>Cantidad de obras totales:</strong><span>57</span></div>
            <div className="row-content"><strong>Cantidad de obras adjudicadas:</strong><span>7</span></div>
            <div className="row-content"><strong>Cantidad de obras en ejecucion:</strong><span>22</span></div>
            <div className="row-content"><strong>Cantidad de obras paralizadas:</strong><span>5</span></div>
            <div className="row-content"><strong>Cantidad de obras ejecutadas:</strong><span>15</span></div>
            <div className="row-content"><strong>Cantidad de obras finalizadas:</strong><span>8</span></div>
          </div>
          <div className="chart">
            <Doughnut 
              data={dataObras}
              options={{
                plugins: {
                  legend:{
                    position: "right"
                  }
                },
                responsive:true
              }}
            />
            
          </div>
        </div>
        <div className="RecuadroDos">
          <h3>Resumen Facturacion</h3>
          <div className="content">
            <div className="row-content"><strong>Facturacion Proyectada:</strong><span>600.210.354</span></div>
            <div className="row-content"><strong>Total Facturado:</strong><span>500.215.420</span></div>
            <div className="row-content"><strong>Pendiente por Facturar:</strong><span>99.994.934</span></div>
            <div className="row-content"><strong>Porcentaje Proyectado:</strong><span>83,34 %</span></div>
            <div className="row-content"><strong>Porcentaje Pendiente:</strong><span>16,66 %</span></div>
          </div>
          <div className="chart">
            <Doughnut 
              data={dataFacturacion}
              options={{
                plugins: {
                  legend:{
                    position: "right"
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="RecuadroTres">
          <h3>Recursos</h3>
          <div className="">
              <Table>
                
                <tbody>
                <tr>
                  <td>Centro de Negocios</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary">
                        Ver Lista
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="menu-dropdown">
                        {cenes?.map((cene)=>{
                          return(
                            <Dropdown.Item key={cene.id_cene}>{cene.nombre}</Dropdown.Item>
                          )
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td><Button variant="danger">+</Button> </td>
                </tr>
                <tr>
                  <td>Clientes</td>
                  <td>
                    <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                        Ver Lista
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="menu-dropdown">
                        {clientes?.map((cliente)=>{
                          return(
                            <Dropdown.Item key={cliente.rut}>{cliente.nombre}</Dropdown.Item>
                          )
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td><Button variant="danger">+</Button></td>
                </tr>
                <tr>
                  <td>Empresas</td>
                  <td>
                    <Dropdown>
                    <Dropdown.Toggle variant="secondary"> 
                        Ver Lista
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="menu-dropdown">
                        {empresas?.map((empresa)=>{
                          return(
                            <Dropdown.Item key={empresa.id}>{empresa.nombre}</Dropdown.Item>
                          )
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td><Button variant="danger">+</Button></td>
                </tr>
                <tr>
                  <td>Personal</td>
                  <td>
                    <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                        Ver Lista
                      </Dropdown.Toggle>
                      <Dropdown.Menu align={'centered'} className="menu-dropdown">
                        {personal?.map((persona)=>{
                          return(
                            <Dropdown.Item key={persona.id}>{persona.nombre} {persona.apellido}</Dropdown.Item>
                          )
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>Estados de obras</td>
                  <td>
                    <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                        Ver Lista
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="menu-dropdown">
                        {estadosObra?.map((estado)=>{
                          return(
                            <Dropdown.Item key={estado.id}>{estado.estado}</Dropdown.Item>
                          )
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>Tipos de obras</td>
                  <td>
                    <Dropdown> 
                    <Dropdown.Toggle variant="secondary">
                        Ver Lista
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="menu-dropdown">
                        {tiposObra?.map((tipo)=>{
                          return(
                            <Dropdown.Item key={tipo.id}>{tipo.nombre}</Dropdown.Item>
                          )
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td><Button variant="danger">+</Button></td>
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
