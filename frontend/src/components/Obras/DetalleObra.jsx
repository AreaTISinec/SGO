import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import SidebarV2 from "../SidebarV2/SidebarV2";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import "./DetalleObra.css";
import  useForm  from '../../utils/useForm'
import { uploadAvanceReal } from "../../actions/newAvance"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Divider from '@mui/material/Divider';
import { getDetalleObra, getEncargado, getSupervisores } from "../../actions/getPetitions.js"
import Spinner from 'react-bootstrap/Spinner';


const DetalleObra = () => {
  const { idObra } = useParams();
  const [detalleObra, setDetalleObra] = useState({});
  const [supervisor, setSupervisor] = useState({});
  const [responsable, setResponsable] = useState({});
  const [showAR, setShowAR] = useState(false);
  const [supervisores, setSupervisores] = useState([]);
  const [fechaActual, setFechaActual] = useState('');

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 2650);
  }

  const handleCloseAR = () => setShowAR(false);
  const handleShowAR = () => setShowAR(true);

  const {  porcentaje, onInputChange, onResetForm } = useForm({
    porcentaje: 0
  })

  const avanceRealSubmit = (e) => {
    e.preventDefault();

    if(porcentaje > detalleObra.porc_avance_operativo && porcentaje <= 100) {
      uploadAvanceReal(fechaActual, porcentaje, idObra);
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
 
  


  useEffect(() => {
    getDetalleObra(idObra, setDetalleObra)
    const fecha = new Date().toISOString().split('T')[0];
    setFechaActual(fecha)
  }, [idObra]); // Ejecutar efecto solo en el montaje inicial del componente

  useEffect(()=>{
    getEncargado(detalleObra.supervisor, setSupervisor)
    getEncargado(detalleObra.responsable, setResponsable)
    getSupervisores(setSupervisores)
  }, [detalleObra])


  return (
    <div className="DetalleObraContainer">
      <SidebarV2 />
      <div className="RecuadroDetalleObra">
        <div className="Titulo">
          <h1>Detalle de la Obra</h1>
          <div className='spinnerLoading'>
            { loading ?
              <Spinner animation="border" variant="danger" className='spinnerLoading' />
            :
              <></>
            }
          </div>
          <Divider/>
          <div className="Botonera">
            {
              detalleObra && detalleObra.is_gantt && detalleObra.is_presupuesto ? //agregar detalleObra.cubicacion pq es obligatorio
              <Link  className="BotonNuevaObra" to={"./nuevo-documento"}>
                <Button variant="danger" onClick={handleClick}>Subir documento</Button>
              </Link>
              :
              <Link className="BotonNuevaObra" to={"./req-documento"}>
                <Button variant="danger" onClick={handleClick}>Subir documento</Button>
              </Link>

            }
            <Link className="BotonNuevaObra" to={"./documentos"}> {/*ver la url */}
              <Button variant="danger" onClick={handleClick}>Ver documentos</Button>
            </Link>
            <Link className="BotonNuevaObra" to={"./avance-financiero"}> {/*ver la url */}
              <Button variant="danger" onClick={handleClick}>Avance Financiero</Button>
            </Link>
            <Link className="BotonNuevaObra" to={"./avance-operativo"}> {/*ver la url */}
              <Button variant="danger" onClick={handleClick}>Avance Operativo</Button>
            </Link>
            {/* {
              detalleObra && !detalleObra.is_avance ?
              <span className="BotonNuevaObra">
                <Button onClick={() => {handleShowAP(); handleClick();}} variant="danger" >Subir avance Proyectado</Button>
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
                        
                        <Button variant="primary" onClick={handleClick} type="onSubmit" disabled={errores.some(e => {
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
            } */}

          </div>
        </div>
        <>
          {detalleObra &&  (
            <div className="DetalleDeLaObra">
              <div className="DataContainer">
                <div className="divider"><Divider variant="middle" textAlign="left"><strong>Personal</strong></Divider></div>
                <div className="Dato"><strong>Responsable:</strong><span className="value-dato">{responsable?.nombre} {responsable?.apellido}</span></div>
                <div className="Dato"><strong>Supervisor:</strong><span className="value-dato">{supervisor?.nombre} {supervisor?.apellido}</span></div>
                <Button onClick={handleShowAR} variant="outline-secondary" className="boton-avance"><FontAwesomeIcon icon={faPenToSquare} /></Button>
                <Modal show={showAR} onHide={handleCloseAR}>
                    <Modal.Header closeButton>
                      <Modal.Title>Asigne un Nuevo Supervisor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={avanceRealSubmit}>
                        <Form.Group>
                          <Form.Label>Supervisores</Form.Label>
                          <Form.Select
                            name="supervisor"
                            onChange={onInputChange}
                          >
                            <option value="">Seleccione un supervisor</option>
                            {
                              supervisores.map((superv) => 
                                <option key={superv.id} value={superv.id}>{superv.nombre} {superv.apellido} </option>
                              )
                            }
                          </Form.Select>
                        </Form.Group>
                      <Button variant="danger" type="onSubmit" onClick={handleClick} disabled>
                        Guardar Avance
                      </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
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
                  
                  
                </>
              
                </div></div>
                <div className="divider"><Divider variant="middle" textAlign="left"><strong>Montos</strong></Divider></div>
                <div className="Dato"><strong>Presupuesto:</strong><span className="value-dato">{detalleObra.presupuesto}</span></div>
                <div className="Dato"><strong>Monto Facturado:</strong><span className="value-dato">{detalleObra.monto_facturado}</span></div>
                <div className="Dato"><strong>Monto por facturar:</strong><span className="value-dato">{detalleObra.monto_por_facturar}</span></div>
                <div className="divider"><Divider/></div>
                <div className="Dato obs"><strong>Observaciones:</strong><span className="value-dato">{detalleObra.observaciones}</span></div>

              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default DetalleObra;
