import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import "./DetalleObra.css";
import  useForm  from '../../utils/useForm'
import { uploadAvanceReal, uploadAvanceProyectado } from "../../actions/newAvance"; 

const DetalleObra = () => {
  const { idObra } = useParams();
  const [detalleObra, setDetalleObra] = useState({});
  const [showAR, setShowAR] = useState(false);
  const [showAP, setShowAP] = useState(false);
  const [numHitos, setNumHitos] = useState(0);
  const [hitos, setHitos] = useState([{
    fecha: '2020-01-01',
    porcentaje: 0
  }])
  const [errores, setErrores] = useState([]);
  // const [avanceProyectado, setAvanceProyectado] = useState([])

  const handleCloseAR = () => setShowAR(false);
  const handleShowAR = () => setShowAR(true);

  const handleCloseAP = () => setShowAP(false);
  const handleShowAP = () => setShowAP(true);

  const { fecha, porcentaje, onInputChange, onResetForm } = useForm({
    fecha: null,
    porcentaje: 0
  })


  const avanceRealSubmit = (e) => {
    e.preventDefault();

    if(porcentaje > detalleObra.porc_avance && porcentaje <= 100) {
      uploadAvanceReal(fecha, porcentaje, idObra);
      setDetalleObra((prevState) => ({
        ...prevState,
        porc_avance: porcentaje
      }));
    } else {
      console.log('Ingrese el porcentaje correcto');
    }
    onResetForm()
    handleCloseAR()
  }

  const onChangeProyectado = (e, index) => {
    const { name, value } = e.target;
  
    setHitos(prevState => {
      const nuevosHitos = [...prevState];
      nuevosHitos[index] = {
        ...nuevosHitos[index],
        [name]: value
      };
  
      // Creamos una variable para almacenar el mensaje de error
      let errorMessage = '';
  
      // Validamos el campo 'fecha'
      if (name === 'fecha') {
        if(nuevosHitos[index - 1] && nuevosHitos[index - 1].fecha >= value)
          errorMessage = `Ingrese una fecha mayor a ${nuevosHitos[index-1].fecha}`;
        
        if(nuevosHitos[index + 1] && nuevosHitos[index + 1].fecha <= value)
          errorMessage = `Ingrese una fecha menor a ${nuevosHitos[index+1].fecha}`;
      }
  
      // Validamos el campo 'porcentaje'
      if (name === 'porcentaje') {
        if(nuevosHitos[index - 1] && parseInt(nuevosHitos[index - 1].porcentaje) >= value)
          {console.log('index -1 (dentro if): ', nuevosHitos[index-1].porcentaje)
          console.log('value (dentro if): ', value)
          errorMessage = `Ingrese un porcentaje mayor a ${nuevosHitos[index-1].porcentaje}`;}

        if(nuevosHitos[index + 1] && parseInt(nuevosHitos[index + 1].porcentaje) <= value)
          errorMessage = `Ingrese un porcentaje menor a ${nuevosHitos[index+1].porcentaje}`;

        if(nuevosHitos[numHitos] && parseInt(nuevosHitos[numHitos].porcentaje) !== 100)
          errorMessage = 'Su ultimo porcentaje debe ser igual a 100';
      }
  
      // Actualizamos el estado de errores
      setErrores(prevErrors => {
        const newErrors = [...prevErrors];
        newErrors[index] = {name: name, message: errorMessage}
        return newErrors;
      });
      

      return nuevosHitos;
    });
  };


  const avanceProyecSubmit = (e) => {
    e.preventDefault();

    uploadAvanceProyectado(hitos, idObra);
      
    onResetForm()
    handleCloseAR()
  }

  const getDatos = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/obras/${idObra}`
    );
    setDetalleObra(data);
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
  }, []); // Ejecutar efecto solo en el montaje inicial del componente


const renderHitosFields = () => {
  const fields = [];
  for (let i = 1; i <= numHitos; i++) {
    fields.push(
      <div  key={i}>

        <Form.Group>
          <Form.Label>{`Fecha hito ${i}`}</Form.Label>
          <Form.Control 
            type="date"
            name={'fecha'}
            placeholder={`Ingrese la fecha del hito ${i}`}
            onChange={ (e) => {
              onChangeProyectado(e, i)
            }}
            required
          />
          {errores[i] && errores[i].name === 'fecha' && <span style={{ color: 'red' }}>{errores[i].message}<br/></span>}
          <Form.Label><br/>{`% Avance esperado hito ${i}`}</Form.Label>
          <Form.Control 
            type="number"
            name={'porcentaje'}
            placeholder={`Ingrese el porcentaje de avance del hito ${i}`}
            onChange={(e) => {
              onChangeProyectado(e, i)
            }}
            required
            max={100}
            min={0}
          />
          {errores[i] && errores[i].name === 'porcentaje' && <span style={{ color: 'red' }}>{errores[i].message}</span>}
        </Form.Group>
        <br/><br/>
      </div>
    );
  }
  return fields;
};

  return (
    <div className="DetalleObraContainer">
      <Sidebar />
      <div className="RecuadroDetalleObra">
        <div className="Titulo">
          <h1>Detalle de la obra</h1>
          {
            detalleObra && detalleObra.gantt && detalleObra.presupuesto ? //agregar detalleObra.cubicacion pq es obligatorio
            <Link  className="BotonNuevaObra" to={"./nuevo-documento"}>
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
          {
            detalleObra && !detalleObra.is_avance ?
            <>
              <Button onClick={handleShowAP} variant="danger" className="boton-avance">Subir Avance Proyectado</Button>
                  <Modal show={showAP} onHide={handleCloseAP}>
                    <Modal.Header closeButton>
                      <Modal.Title>Definir Avance Proyectado</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={avanceProyecSubmit}>
                        <Form.Group>
                          <Form.Label>Ingrese la cantidad de hitos</Form.Label>
                          <Form.Control 
                            type="number"
                            name="hitos"
                            onChange={(e)=>{
                              setNumHitos(parseInt(e.target.value))
                            }}
                            required
                          />
                        </Form.Group>

                      {renderHitosFields()}
                      
                      <Button variant="primary" type="onSubmit" disabled={errores.some(e => {
                        if(e)
                          return e.message !== ''
                      }) }>
                        Guardar Avance
                      </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
            </>:
            <></>
          }
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
                <Button onClick={handleShowAR} variant="danger" className="boton-avance">subir avance</Button>
                <Modal show={showAR} onHide={handleCloseAR}>
                  <Modal.Header closeButton>
                    <Modal.Title>Ingrese el Avance</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={avanceRealSubmit}>
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
