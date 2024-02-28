import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import SidebarV2 from "../SidebarV2/SidebarV2";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import "./DetalleObra.css";
import  useForm  from '../../utils/useForm'
import { uploadAvanceReal, uploadAvanceProyectado } from "../../actions/newAvance"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Divider from '@mui/material/Divider';
import { getDetalleObra, getEncargado } from "../../actions/getPetitions.js"



const DetalleObra = () => {
  const { idObra } = useParams();
  const [detalleObra, setDetalleObra] = useState({});
  const [supervisor, setSupervisor] = useState([]);
  const [responsable, setResponsable] = useState([]);
  const [showAR, setShowAR] = useState(false);
  const [showAP, setShowAP] = useState(false);
  const [numHitos, setNumHitos] = useState(0);
  const [hitos, setHitos] = useState([{
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

    if(porcentaje > detalleObra.porc_avance_operativo && porcentaje <= 100) {
      uploadAvanceReal(fecha, porcentaje, idObra);
      setDetalleObra((prevState) => ({
        ...prevState,
        porc_avance_operativo: porcentaje
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
    getDetalleObra(idObra, setDetalleObra)
    getEncargado(detalleObra.supervisor, setSupervisor)
    getEncargado(detalleObra.responsable, setResponsable)
    console.log('supervisor', supervisor)
  }, [detalleObra]); // Ejecutar efecto solo en el montaje inicial del componente



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

  console.log(detalleObra)
  return (
    <div className="DetalleObraContainer">
      <SidebarV2 />
      <div className="RecuadroDetalleObra">
        <div className="Titulo">
          <h1>Detalle de la Obra</h1>
          <Divider/>
          <div className="Botonera">
            {
              detalleObra && detalleObra.is_gantt && detalleObra.is_presupuesto ? //agregar detalleObra.cubicacion pq es obligatorio
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
            <Link className="BotonNuevaObra" to={"./documentos"}> {/*ver la url */}
              <Button variant="danger">Avance Financiero</Button>
            </Link>
            {
              detalleObra && !detalleObra.is_avance ?
              <span className="BotonNuevaObra">
                <Button onClick={handleShowAP} variant="danger" >Subir avance Proyectado</Button>
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
              </span>:
              <></>
            }

          </div>
        </div>
        <>
          {detalleObra &&  (
            <div className="DetalleDeLaObra">
              <div className="DataContainer">
                <div className="divider"><Divider variant="middle" textAlign="left"><strong>Personal</strong></Divider></div>
                <div className="Dato"><strong>Responsable:</strong><span className="value-dato">{responsable?.nombre} {responsable?.apellido}</span></div>
                <div className="Dato"><strong>Supervisor:</strong><span className="value-dato">{supervisor?.nombre} {supervisor?.apellido}</span></div>
                <div className="divider"><Divider variant="middle" textAlign="left"><strong>Fechas</strong></Divider></div>
                <div className="Dato"><strong>Inicio:</strong><span className="value-dato">{detalleObra.fecha_inicio}</span></div>
                <div className="Dato"><strong>Termino:</strong><span className="value-dato">{detalleObra.fecha_termino}</span></div>
                <div className="Dato"><strong>Asignacion:</strong><span className="value-dato">{detalleObra.fecha_asignacion}</span></div>
                <div className="divider"><Divider variant="middle" textAlign="left"><strong>Ubicacion</strong></Divider></div>
                <div className="Dato"><strong>Empresa:</strong><span className="value-dato">{detalleObra.empresa}</span></div>
                <div className="Dato"><strong>Direccion:</strong><span className="value-dato">{detalleObra.direccion}</span></div>
                <div className="Dato"><strong>Comuna:</strong><span className="value-dato">{detalleObra.comuna}</span></div>
                <div className="divider"><Divider variant="middle" textAlign="left"><strong>Obra</strong></Divider></div>
                <div className="Dato"><strong>Tipo de Obra:</strong><span className="value-dato">{detalleObra.tipo_obra}</span></div>
                <div className="Dato"><strong>Estado de Obra:</strong><span className="value-dato">{detalleObra.estado_obra}</span></div>
                <div className="Dato"><strong>Porcentaje de Avance:</strong><div className="porcentaje-cont"><span className="value-dato">{detalleObra.porc_avance_operativo} %</span>
                <> 
                  <Button onClick={handleShowAR} variant="outline-secondary" className="boton-avance"><FontAwesomeIcon icon={faPenToSquare} /></Button>
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
                </div></div>
                <div className="divider"><Divider variant="middle" textAlign="left"><strong>Montos</strong></Divider></div>
                <div className="Dato"><strong>Presupuesto:</strong><span className="value-dato">{detalleObra.presupuesto}</span></div>
                <div className="Dato"><strong>Monto Facturado:</strong><span className="value-dato">{detalleObra.monto_facturado}</span></div>
                <div className="Dato"><strong>Monto por facturar:</strong><span className="value-dato">{detalleObra.monto_por_facturar}</span></div>
                <div className="divider"><Divider/></div>
                <div className="Dato obs"><strong>Observaciones:</strong><span className="value-dato">{detalleObra.observaciones}</span></div>

              </div>
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
