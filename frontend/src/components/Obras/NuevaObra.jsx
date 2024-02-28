import { useContext, useEffect, useState } from "react";
import { uploadObra } from "../../actions/newWorks.js"
import { getEmpresas, getTiposObra, getEstadosObra, getCeNe, getSupervisores } from "../../actions/getPetitions.js";
import useForm from "../../utils/useForm.jsx";
import AuthContext from "../../context/AuthContext.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import dataComunas from '../../utils/comunas.json'
import SidebarV2 from "../SidebarV2/SidebarV2";
import "./NuevaObra.css";

const NuevaObra = () => {
  const {user, profile} = useContext(AuthContext);

  console.log(profile)

  const [empresas, setEmpresas] = useState([]);
  const [tiposObra, setTiposObra] = useState([]);
  const [estadosObra, setEstadosObra] = useState([]);
  const [comunas, setComunas] = useState([])
  const [cenes, setCene] = useState([])
  const [supervisores, setSupervisores] = useState([])

  const { regiones } = dataComunas

  useEffect(()=> {
    getEmpresas(setEmpresas)
    getTiposObra(setTiposObra)
    getEstadosObra(setEstadosObra)
    getCeNe(setCene)
    getSupervisores(setSupervisores)
  },[])

  const { 
    fecha_inicio, 
    fecha_termino, 
    fecha_asignacion,
    monto_neto, 
    empresa, 
    direccion, 
    comuna, 
    tipo_obra, 
    estado_obra, 
    observaciones, 
    porc_avance, 
    monto_facturado, 
    saldo_facturado, 
    id_user,
    id_cene,
    onInputChange, 
    onResetForm 
  } = useForm({ //agregar correctamente los parametros de la nueva obra
    fecha_inicio: null,
    fecha_termino: null,
    fecha_asignacion: null,
    monto_neto: 0,
    empresa: 'Sinec',
    direccion: '',
    comuna: '',
    tipo_obra: 'Alumbrado Publico',
    estado_obra: 'Adjudicada',
    observaciones: '',
    porc_avance: 0, 
    monto_facturado: 0, 
    saldo_facturado: 0, 
    id_user: user.user_id,
    id_cene: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    uploadObra(
      fecha_inicio, 
      fecha_termino, 
      fecha_asignacion, 
      monto_neto, 
      empresa, 
      direccion, 
      comuna, 
      tipo_obra, 
      estado_obra, 
      observaciones, 
      porc_avance, 
      monto_facturado, 
      saldo_facturado, 
      id_user,
      id_cene
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
          <Form className="formularioNuevaObra" onSubmit={onSubmit}>
            <Form.Group className="mb-3" >
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ingrese la fecha de inicio"
                name="fecha_inicio"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Fecha de Termino</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ingrese la fecha de termino"
                name="fecha_termino"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Fecha de Asignacion</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ingrese la fecha de asignacion"
                name="fecha_asignacion"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Region</Form.Label>
              <Form.Select onChange={onChangeSelect}>
                {regiones.map((region, indice) => 
                   <option key={indice} value={indice}>{region.region}</option>
                )
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Comuna</Form.Label>
              <Form.Select
                name="comuna"
                onChange={onInputChange}
              >
                {
                  comunas.map((comuna)=>
                    <option key={comuna} value={comuna}>{comuna}</option>
                  )
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la direccion de la obra"
                name="direccion"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Empresa</Form.Label>
              <Form.Select
                onChange={onInputChange}
                name="empresa"
              >
                {
                  empresas.map((empresa)=>(
                    <option key={empresa.id} value={empresa.nombre}>{empresa.nombre}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Centro de Negocios</Form.Label>
              <Form.Select
               name='id_cene'
               onChange={onInputChange}
               >
                {
                  cenes.map((cene) => 
                    <option key={cene.id_cene}  value={cene.id_cene}>{cene.nombre}</option>
                  )
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Supervisor de la Obra</Form.Label>
              <Form.Select
               name=''
               onChange={onInputChange}
               >
                {
                  supervisores.map((supervisor) => 
                    <option key={supervisor.id}  value={supervisor.id}>{supervisor.nombre} {supervisor.apellido}</option>
                  )
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Tipo de obra</Form.Label>
              <Form.Select
                onChange={onInputChange}
                name="tipo_obra"
              > 
              {
                tiposObra?.map((tipo)=>(
                  <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                ))
              }
                
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Estado de obra</Form.Label>
              <Form.Select
                onChange={onInputChange}
                name="estado_obra"
              >
                {
                  estadosObra.map((estado)=>(
                    <option key={estado.id} value={estado.estado}>{estado.estado}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Monto neto</Form.Label>
              <Form.Control
                type="text"
                pattern="[0-9]*"
                placeholder="Ingrese el monto neto de la obra"
                name="monto_neto"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese observaciones de la obra"
                name="observaciones"
                onChange={onInputChange}
              />
            </Form.Group>

            <Button variant="danger" type="submit">
              Crear Obra
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NuevaObra;
