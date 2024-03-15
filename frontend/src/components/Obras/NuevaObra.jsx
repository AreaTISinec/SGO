import { useContext, useEffect, useState } from "react";
import { uploadObra } from "../../actions/newWorks.js"
import { getEmpresas, getTiposObra, getEstadosObra, getSupervisores, getCeNes, getClientes} from "../../actions/getPetitions.js";
import Spinner from 'react-bootstrap/Spinner';
import useForm from "../../utils/useForm.jsx";
import AuthContext from "../../context/AuthContext.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import dataComunas from '../../utils/comunas.json'
import SidebarV2 from "../SidebarV2/SidebarV2";
import "./NuevaObra.css";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Divider from '@mui/material/Divider';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


const NuevaObra = () => {
  const {profile} = useContext(AuthContext);

  const [empresas, setEmpresas] = useState([]);
  const [tiposObra, setTiposObra] = useState([]);
  const [estadosObra, setEstadosObra] = useState([]);
  const [comunas, setComunas] = useState([])
  const [cenes, setCene] = useState([])
  const [supervisores, setSupervisores] = useState([])
  const [clientes, setClientes] = useState([])

  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 2650);
  }

  const { regiones } = dataComunas

  useEffect(()=> {
    getEmpresas(setEmpresas)
    getTiposObra(setTiposObra)
    getEstadosObra(setEstadosObra)
    getCeNes(setCene)
    getSupervisores(setSupervisores)
    getClientes(setClientes)
  },[])

  const { 
    fecha_inicio, 
    fecha_termino, 
    fecha_asignacion,
    presupuesto, 
    empresa,
    cliente,
    nombre,
    porc_avance_financiero,
    porc_avance_operativo, 
    direccion, 
    comuna, 
    tipo_obra, 
    estado_obra, 
    observaciones, 
    monto_facturado, 
    monto_por_facturar,
    supervisor_id,
    cene_id,
    is_gantt,
    is_presupuesto,
    is_avance,
    onInputChange, 
    onResetForm 
  } = useForm({ //agregar correctamente los parametros de la nueva obra
    fecha_inicio: null,
    fecha_termino: null,
    fecha_asignacion: null,
    presupuesto: 0,
    empresa: 'Sinec',
    cliente: '',
    nombre: '',
    porc_avance_financiero: 0,
    porc_avance_operativo: 0,
    direccion: '',
    comuna: '',
    tipo_obra: 'Empalmes y Celdas',
    estado_obra: 'Adjudicada',
    observaciones: '',
    monto_facturado: 0, 
    monto_por_facturar: 0,
    supervisor_id: 0,
    cene_id: '',
    is_gantt: false,
    is_presupuesto: false,
    is_avance: false
  });

  const onSubmit = (e) => {
    e.preventDefault();
    uploadObra(
      empresa, 
      cliente, 
      nombre,
      parseInt(presupuesto), 
      porc_avance_financiero,  //debiesen iniciar en 0, en una obra nueva
      porc_avance_operativo,
      estado_obra,
      fecha_inicio, 
      fecha_termino, 
      fecha_asignacion, 
      direccion, 
      comuna, 
      tipo_obra,
      //RELLENO
      profile.id,
      parseInt(supervisor_id),
      cene_id,
      observaciones,
      monto_facturado,
      monto_por_facturar,
      is_gantt,
      is_presupuesto,
      is_avance
    )  
    onResetForm();
  };

  const onChangeSelect = ({target}) => {
    const {value } = target
    setComunas(regiones[value].comunas)
  }
  

  return (
    <div className="NuevaObra">
      <SidebarV2 />
      <div className="RecuadroNuevaObra">
        <div>
          <div className='spinnerLoading'>
            { loading ?
              <Spinner animation="border" variant="danger" className='spinnerLoading' />
            :
              <></>
            }
          </div>
          <h2>Crear Nueva Obra</h2>
          <Form className="formularioNuevaObra" onSubmit={onSubmit}>
          <Divider variant="middle"><strong>Informacion basica</strong></Divider>
          <Form.Group className="mb-3" >
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre de la Obra"
                className="mb-3"
              >
              <Form.Control
                type="text"
                name="nombre"
                onChange={onInputChange}
                placeholder="Ingrese el nombre de la obra"
                required
              />
              </FloatingLabel>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" >
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Nombre del Supervisor"
                    className="mb-3"
                  >
                    <Form.Select
                    name='supervisor_id'
                    onChange={onInputChange}
                    required
                    >
                      <option value="">Selecciona un supervisor</option>
                      {
                        supervisores?.map((supervisor) => 
                          <option key={supervisor.id}  value={supervisor.id}>{supervisor.nombre} {supervisor.apellido}</option>
                        )
                      }
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>

              </Col>
              <Col>
                <Form.Group className="mb-3" >
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Nombre del Cliente"
                    className="mb-3"
                  >
                    <Form.Select
                    name='cliente'
                    onChange={onInputChange}
                    required
                    >
                      <option value="">Selecciona un cliente</option>
                      {
                        clientes?.map((cliente) => 
                          <option key={cliente.rut}  value={cliente.nombre}>{cliente.nombre}</option>
                        )
                      }
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" >
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Nombre de la Empresa"
                    className="mb-3"
                  >
                  <Form.Select
                    onChange={onInputChange}
                    name="empresa"
                    required
                  >
                    <option value="">Selecciona una empresa</option>
                    {
                      empresas.map((empresa)=>(
                        <option key={empresa.id} value={empresa.nombre}>{empresa.nombre}</option>
                      ))
                    }
                  </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" >
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Tipo de Obra"
                    className="mb-3"
                >
                    <Form.Select
                      onChange={onInputChange}
                      name="tipo_obra"
                      required
                    > 
                      <option value="">Selecciona un tipo de obra</option>
                    {
                      tiposObra?.map((tipo)=>(
                        <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                      ))
                    }
                      
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" >
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Estado de la Obra"
                    className="mb-3"
                  >
                    <Form.Select
                      onChange={onInputChange}
                      name="estado_obra"
                      required
                    >
                      <option value="">Selecciona un estado de obra</option>
                      {
                        estadosObra.map((estado)=>(
                          <option key={estado.id} value={estado.estado}>{estado.estado}</option>
                        ))
                      }
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Divider variant="middle"><strong>Presupuesto</strong></Divider>
            <Row>

              <Col>
                <Form.Group className="mb-3" >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Presupuesto Inicial"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Ingrese el monto neto de la obra"
                      name="presupuesto"
                      onChange={onInputChange}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              
              <Col>
                <Form.Group className="mb-3" >
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Centro de Negocios"
                    className="mb-3"
                  >
                    <Form.Select
                    name='cene_id'
                    onChange={onInputChange}
                    required
                    >
                      <option value="">Selecciona un centro de negocios</option>
                      {
                        cenes.map((cene) => 
                          <option key={cene.id_cene}  value={cene.id_cene}>{cene.nombre}</option>
                        )
                      }
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>

            <Divider variant="middle"><strong>Fechas</strong></Divider>
            
            <Row>
              <Col>
                <Form.Group className="mb-3" >
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Fecha de Asignación"
                      className="mb-3"
                    >
                      <Form.Control
                        type="date"
                        name="fecha_asignacion"
                        onChange={onInputChange}
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Fecha de Inicio"
                    className="mb-3"
                  >
                    <Form.Control
                      type="date"
                      placeholder="Ingrese la fecha de inicio"
                      name="fecha_inicio"
                      onChange={onInputChange}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Fechaa de Termino"
                    className="mb-3"
                  >
                    <Form.Control
                      type="date"
                      placeholder="Ingrese la fecha de termino"
                      name="fecha_termino"
                      onChange={onInputChange}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>

            <Divider variant="middle"><strong>Ubicacion</strong></Divider>

            <Row>
              <Col>
                <Form.Group className="mb-3" >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Región"
                    className="mb-3"
                  >
                    <Form.Select onChange={onChangeSelect}>
                      <option value="">Selecciona una region</option>
                      {regiones.map((region, indice) => 
                        <option key={indice} value={indice}>{region.region}</option>
                      )
                      }
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Comuna"
                    className="mb-3"
                  >
                    <Form.Select
                      name="comuna"
                      onChange={onInputChange}
                      required
                    >
                      <option value="">Selecciona una comuna</option>
                      {
                        comunas.map((comuna)=>
                          <option key={comuna} value={comuna}>{comuna}</option>
                        )
                      }
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3" >
              <FloatingLabel
                controlId="floatingInput"
                label="Dirección de la Obra"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Ingrese la direccion de la obra"
                  name="direccion"
                  onChange={onInputChange}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Row>

            </Row>
            
            <Divider variant="middle"><strong>Adicional</strong></Divider>

            <Form.Group className="mb-3" >
              <FloatingLabel
                controlId="floatingInput"
                label="Observaciones"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Ingrese observaciones de la obra"
                  name="observaciones"
                  onChange={onInputChange}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Button variant="danger" type="submit" onClick={handleClick}>
              Crear Obra
            </Button>
            
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NuevaObra;
