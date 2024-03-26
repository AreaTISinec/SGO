import { useEffect, useState } from "react"
import SidebarV2 from "../../components/SidebarV2/SidebarV2"
import './Facturacion.css'
import { getEmpresas, getAllHistorialFinanciero, getObras } from '../../actions/getPetitions'

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Divider from '@mui/material/Divider';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Facturacion = () => {
  const [presupuesto, setPresupuesto] = useState(0);
  const [obras, setObras] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [preEmpresas, setPreEmpresas] = useState({})
  const [avances, setAvances] = useState({})
  const [facturacion, setFacturacion] = useState({})
  const [historialFacturas, setHistorialFacturas] = useState([])
  const [show, setShow] = useState(false)
  const [carga, setCarga] = useState(false)
  const [manual, setManual] = useState(false)

  const handleShow = () => setShow(!show)
 
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
          <p> | filtrar?Meses?Clientes?Trabajador? | graficos?semaforo? | ???</p>
          <Button variant='danger' onClick={()=>handleShow()} className="mx-2">Subir Factura</Button>
          <Button variant='danger'>Proyectar Facturacion</Button>
            <p>Total presupuestos: $ {presupuesto}</p>
            <Tabs fill>
              <Tab eventKey='Sinec' title='Sinec'>
                <p >Total presupuesto Sinec: $ {preEmpresas.Sinec} </p>
                <p >Total facturado Sinec: $ {facturacion.Sinec} </p>
                <p >Total por facturar Sinec: $ {preEmpresas.Sinec - facturacion.Sinec} </p>
                <p> (facturado/presupuesto) {((facturacion.Sinec / preEmpresas.Sinec)*100).toFixed(2)} %</p>
                <p> (Facturado/por Facturar) {((facturacion.Sinec / (preEmpresas.Sinec - facturacion.Sinec))*100).toFixed(2)} % </p>
                <p>&emsp; Porcentaje Avance Operativo Sinec(media):  {avances.Sinec?.operativo.toFixed(2)} %</p>
                <p>&emsp;Porcentaje Avance Financiero Sinec(media):  {avances.Sinec?.financiero.toFixed(2)} %</p>
                <p>&emsp;KPI: {(avances.Sinec.operativo/avances.Sinec.financiero).toFixed(2)} == {(avances.Sinec.operativo/avances.Sinec.financiero)} </p>
              </Tab>
              <Tab eventKey='Ekoluz' title='Ekoluz'>
                <p >Total presupuesto Ekoluz: $ {preEmpresas.Ekoluz} </p>
                <p>&emsp; Porcentaje Avance Operativo Ekoluz:  {avances.Ekoluz.operativo} %</p>
                <p>&emsp;Porcentaje Avance Financiero Ekoluz:  {avances.Ekoluz.financiero} %</p>
                <p>&emsp;KPI: {avances.Sinec.operativo/avances.Ekoluz.financiero}</p>
              </Tab>
              <Tab eventKey='Urbelec' title='Urbelec'>
                <p >Total presupuesto Urbelec: $ {preEmpresas.Urbelec} </p>
                <p>&emsp; Porcentaje Avance Operativo Urbelec:  {avances.Urbelec.operativo} %</p>
                <p>&emsp;Porcentaje Avance Financiero Urbelec:  {avances.Urbelec.financiero} %</p>
                <p>&emsp;KPI: {avances.Sinec.operativo/avances.Urbelec.financiero}</p>
              </Tab>
              <Tab eventKey='Sinelec' title='Sinelec'>
                <p >Total presupuesto Sinelec: $ {preEmpresas.Sinelec} </p>
                <p>&emsp; Porcentaje Avance Operativo Sinelec:  {avances.Sinelec.operativo} %</p>
                <p>&emsp;Porcentaje Avance Financiero Sinelec:  {avances.Sinelec.financiero} %</p>
                <p>&emsp;KPI: {avances.Sinec.operativo/avances.Sinelec.financiero}</p>

              </Tab>
            </Tabs>
        </div>
          :
          <></>
        }
        <Modal show={show} onHide={handleShow}>
          <Modal.Header  closeButton>
            <Modal.Title>Subir Facturacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              variant='outline-danger'
              className="m-3"
              onClick={()=> {
                setManual(true)
                setCarga(false)
              }} 
            >Subir Manualmente</Button>
            <Button
              variant='outline-danger'
              className="m-3"
              onClick={()=> {
                setManual(false)
                setCarga(true)
              }}
            >Cargar Archivo</Button>
            {
              manual && !carga ?

              <Form>
                <Divider><strong>Manual</strong></Divider>
                <Row>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label='Nombre del Documento'
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Ingrese el nombre del documento"
                          name="nombre-documento"
                          value=''
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label='Numero del Documento'
                        className="mb-3"
                      >
                        <Form.Control 
                          type='number'
                          placeholder='Ingrese el numero de documento'
                          name='numero-documento'
                          value=''
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <Divider>Fechas</Divider>
                
                <Row>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label='Fecha'
                        className="mb-3"
                      >
                        <Form.Control 
                          type="date"
                          placeholder="Ingresa la fecha"
                          name='fecha'
                          value=''
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label='Fecha de Vencimiento'
                        className="mb-3"
                      >
                        <Form.Control 
                          type="date"
                          placeholder="Ingresa la fecha vencimiento"
                          name='fecha'
                          value=''
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <Divider>Cliente</Divider>

                <Row>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label='Nombre del Cliente'
                        className="mb-3"
                      >
                        <Form.Control
                          type='text'
                          placeholder="Ingrese el nombre del cliente"
                          name='cliente'
                          value=''
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label='Rut del Cliente'
                        className="mb-3"
                      >
                        <Form.Control 
                          type="text"
                          placeholder="Ingrese el rut del cliente"
                          name='rut-cliente'
                          value=''
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <Divider>Costo</Divider>

                <Row>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label='Total Detalle'
                        className="mb-3"
                      >
                        <Form.Control 
                          type='number'
                          placeholder='Ingrese el total del detalle'
                          name='total'
                          value=''
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label='Centro de Negocios'
                        className="mb-3"
                      >
                        <Form.Select>
                          <option>Seleccione un centro de negocios</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <Divider>Comentarios</Divider>

                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label='Comentario del Item'
                    className="mb-3"
                  >
                    <Form.Control 
                      type='text'
                      placeholder="Ingrese comentario del item"
                      name='comentario'
                      value=''
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label='Descripcion'
                    className="mb-3"
                  >
                    <Form.Control 
                      type='text'
                      placeholder='Ingrese la descripcion del producto'
                      name='descripcion'
                      value=''
                    />
                  </FloatingLabel>
                </Form.Group>

                <Button variant='danger'>Subir Facturacion</Button>

              </Form>
              : (!manual && carga ) ?
              <Form>
              <Divider><strong>Archivo</strong></Divider>
                <Form.Group>
                  <Form.Label>Seleccione documento</Form.Label>
                  <Form.Control
                    type="file"
                  />

                </Form.Group>

                <Button variant='danger' className="mt-3">Subir Facturacion</Button>
              </Form>
            : <></>
          }
          </Modal.Body>
        </Modal>

            
          
          
      </div>
    </div>
  )
}

export default Facturacion
