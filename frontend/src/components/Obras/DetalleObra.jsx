import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import "./DetalleObra.css";
import  useForm  from '../../utils/useForm'
import { uploadAvance } from "../../actions/newAvance";

const DetalleObra = () => {
  const { idObra } = useParams();
  const [detalleObra, setDetalleObra] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { fecha, porcentaje, onInputChange, onResetForm } = useForm({
    fecha: null,
    porcentaje: 0
  })
  


  const avanceSubmit = (e) => {
    e.preventDefault(); 
    if(porcentaje <= detalleObra.porc_avance || porcentaje > 100){
      console.log('Ingrese el porcentaje correcto')
    }else{
      uploadAvance(fecha, porcentaje, idObra)
      setDetalleObra((prevState)=> ({
        ...prevState,
        porc_avance: porcentaje
      }))
    }
    onResetForm()
    handleClose()
  }

  const getDatos = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/obras/${idObra}`
    );
    setDetalleObra(data);
    console.log('detalleObra')
    console.log(detalleObra.id)
  };
 
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    console.log('useEffect del accessToken')
    const fetchAccessToken = async () => {
      try {
        // Realiza una solicitud a tu backend para obtener un nuevo token de acceso
        const response = await fetch('http://127.0.0.1:8000/api/powerbi/getAccessToken/');
        const data = await response.json();
        // Actualiza el estado del token de acceso con el nuevo token
        setAccessToken(data.accessToken);
        
        //console.log(accessToken)
      } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
      }
    };
    fetchAccessToken()
    // Refresca el token de acceso cada hora (3600000 milisegundos)
    const intervalId = setInterval(fetchAccessToken, 3600000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // Ejecutar efecto solo en el montaje inicial del componente


  useEffect(() => {
    getDatos();
    console.log('useEffect del getdatos')
  }, []); // Ejecutar efecto solo en el montaje inicial del componente


  return (
    <div className="DetalleObraContainer">
      <Sidebar />
      <div className="RecuadroDetalleObra">
        <div className="Titulo">
          <h1>Detalle de la obra</h1>
          {
            detalleObra && detalleObra.gantt && detalleObra.presupuesto ? 
            <Link className="BotonNuevaObra" to={"./nuevo-documento"}>
              <Button variant="danger">Subir documento</Button>
            </Link>
            :
            <Link className="BotonNuevaObra" to={"./req-documento"}>
              <Button variant="danger">Subir documento</Button>
            </Link>

          }
          <Link className="BotonNuevaObra" to={"./documentos"}> {/*ver la url */}
            <Button variant="danger">Ver documentos</Button>
          </Link>
        </div>
        <>
          {detalleObra &&  (
            <div className="DetalleDeLaObra">
              <div className="Dato"><strong>ID de la obra</strong><strong>{detalleObra.id}</strong></div>
              <div className="Dato"><strong>Fecha de Inicio</strong><strong>{detalleObra.fecha_inicio}</strong></div>
              <div className="Dato"><strong>Termino</strong><strong>{detalleObra.fecha_termino}</strong></div>
              <div className="Dato"><strong>Asignacion</strong><strong>{detalleObra.fecha_asignacion}</strong></div>
              <div className="Dato"><strong>Monto Neto</strong><strong>{detalleObra.monto_neto}</strong></div>
              <div className="Dato"><strong>Empresa</strong><strong>{detalleObra.empresa}</strong></div>
              <div className="Dato"><strong>Direccion</strong><strong>{detalleObra.direccion}</strong></div>
              <div className="Dato"><strong>Comuna</strong><strong>{detalleObra.comuna}</strong></div>
              <div className="Dato"><strong>Tipo de Obra</strong><strong>{detalleObra.tipo_obra}</strong></div>
              <div className="Dato"><strong>Estado de Obra</strong><strong>{detalleObra.estado_obra}</strong></div>
              <div className="Dato"><strong>Observaciones</strong><strong>{detalleObra.observaciones}</strong></div>
              <div className="Dato"><strong>Porcentaje de Avance</strong><strong>{detalleObra.porc_avance} %</strong>
              <>
                <Button onClick={handleShow} variant="danger" className="boton-avance">subir avance</Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Ingrese el Avance</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={avanceSubmit}>
                      <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control 
                          type="date"
                          name="fecha"
                          onChange={onInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control 
                          type="number"
                          name="porcentaje"
                          placeholder="Ingrese el porcentaje de avance "
                          onChange={onInputChange}
                          required
                        />
                      </Form.Group>
                    <Button variant="primary" type="onSubmit" >
                      Guardar Avance
                    </Button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </>
              </div>
              <div className="Dato"><strong>Monto Facturado</strong><strong>{detalleObra.monto_facturado}</strong></div>
              <div className="Dato"><strong>Saldo Facturado</strong><strong>{detalleObra.saldo_facturado}</strong></div>
              <div className="reportClass">  
                <PowerBIEmbed
                embedConfig = {{
                  type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                  id: '5c607318-8d82-49bf-a371-7e0edf855485',
                  embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=5c607318-8d82-49bf-a371-7e0edf855485&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwiZGlzYWJsZUFuZ3VsYXJKU0Jvb3RzdHJhcFJlcG9ydEVtYmVkIjp0cnVlfX0%3d',
                  accessToken: accessToken,
                  tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
                  settings: {
                    panes: {
                      filters: {
                        expanded: false,
                        visible: false
                      }
                    },
                    background: models.BackgroundType.Transparent,
                  }
                }}

                eventHandlers = {
                  new Map([
                    ['loaded', function () {console.log('Report loaded');}],
                    ['rendered', function () {console.log('Report rendered');}],
                    ['error', function (event) {console.log(event.detail);}],
                    ['visualClicked', () => console.log('visual clicked')],
                    ['pageChanged', (event) => console.log(event)],
                  ])
                }
                
                cssClassName = { "reportClass" }
                getEmbeddedComponent = { (embeddedReport) => {
                  window.report = embeddedReport ;
                }}
                />
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default DetalleObra;
