import { useEffect, useState } from "react"
import SidebarV2 from "../../components/SidebarV2/SidebarV2"
import './Facturacion.css'
import { getEmpresas, getAllHistorialFinanciero, getObras, getCeNes } from '../../actions/getPetitions'

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Divider from '@mui/material/Divider';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import useForm from "../../utils/useForm";
import { uploadForm, upload_xlxs } from "../../actions/files";

const Facturacion = () => {
  const [presupuesto, setPresupuesto] = useState(0);
  const [obras, setObras] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [cenes, setCenes] = useState([])
  const [preEmpresas, setPreEmpresas] = useState({})
  const [avances, setAvances] = useState({})
  const [facturacion, setFacturacion] = useState({})
  const [historialFacturas, setHistorialFacturas] = useState([])
  const [show, setShow] = useState(false)
  const [carga, setCarga] = useState(false)
  const [manual, setManual] = useState(false)
  const [file, setFile] = useState(null)

  const onChange = e => {
    setFile(e.target.files[0])
  }

  const { nombre_doc, num_doc, cod_cliente, nom_cliente, fecha, fecha_venc, desc_producto, total_detalle, analisis_cn, comentario, linea, empresa, precio_unit, total_neto, es_venta, onInputChange, onResetForm } = useForm({
    nombre_doc: '',
    num_doc: -1,
    cod_cliente: '',
    nom_cliente: '',
    fecha: '',
    fecha_venc: '',
    desc_producto: '',
    total_detalle: 0,
    analisis_cn: '',
    comentario: '',
    linea: 0,
    empresa: '',
    precio_unit: 0,
    total_neto: 0,
    es_venta: 0
  })

  const handleShow = () => setShow(!show)
 
  useEffect(()=> {
    getObras(setObras);
    getEmpresas(setEmpresas);
    getAllHistorialFinanciero(setHistorialFacturas)
    getCeNes(setCenes)
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

  const onSubmitForm = (e) => {
    e.preventDefault();
    uploadForm(nombre_doc, num_doc, cod_cliente, nom_cliente, fecha, fecha_venc, desc_producto, total_detalle, analisis_cn, comentario, linea, empresa, precio_unit, total_neto, es_venta)
    onResetForm();
  }

  const onSubmitFile = (e) => {
    console.log('e', e)
    console.log('file: ', file)
    e.preventDefault()
    upload_xlxs(file)
  }

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
            <p className="mt-3">Total presupuestos: $ {presupuesto}</p>
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

              <Form onSubmit={onSubmitForm}>
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
                          name="nombre_doc"
                          value={nombre_doc}
                          onChange={onInputChange}
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
                          name='num_doc'
                          value={num_doc}
                          onChange={onInputChange}
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
                          value={fecha}
                          onChange={onInputChange}
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
                          name='fecha_venc'
                          value={fecha_venc}
                          onChange={onInputChange}
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
                          name='nom_cliente'
                          value={nom_cliente}
                          onChange={onInputChange}
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
                          name='cod_cliente'
                          value={cod_cliente}
                          onChange={onInputChange}
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
                          name='total_detalle'
                          value={total_detalle}
                          onChange={onInputChange}
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
                        <Form.Select
                          onChange={onInputChange}
                          value={analisis_cn}
                          name='analisis_cn'
                        >
                          <option>Seleccione un centro de negocios</option>
                          {
                            cenes.map((cene) => (
                              <option value={cene.id} key={cene.id_cene}>{cene.nombre}</option>
                            ))
                          }
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label='Linea'
                        className="mb-3"
                      >
                        <Form.Control 
                          type='number'
                          placeholder='Ingrese la Linea'
                          name='linea'
                          value={linea}
                          onChange={onInputChange}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label='Empresa'
                        className="mb-3"
                      >
                        <Form.Select
                          onChange={onInputChange}
                          name='empresa'
                          value={empresa}
                        >
                          <option>Seleccione una empresa</option>
                          {
                            empresas.map((empresa)=>(
                              <option value={empresa.id} key={empresa.nombre}>{empresa.nombre}</option>
                            ))
                          }
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
                      value={comentario}
                      onChange={onInputChange}
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
                      name='desc_producto'
                      value={desc_producto}
                      onChange={onInputChange}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Button variant='danger' type="submit">Subir Facturacion</Button>

              </Form>
              : (!manual && carga ) ?
              <Form className="d-flex flex-column" onSubmit={onSubmitFile} encType="multipart/form-data">
              <Divider><strong>Archivo</strong></Divider>
                <Form.Group>
                  <Form.Label>Seleccione documento</Form.Label>
                  <Form.Control
                    type="file"
                    name="file"
                    onChange={onChange}
                  />

                </Form.Group>
                
                <a className="mt-3 bg-transparent" href="">Descargar Plantilla</a>

                <Button variant='danger' className="mt-3" type="submit">Subir Facturacion</Button>
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
