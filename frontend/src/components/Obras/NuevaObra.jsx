import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./NuevaObra.css";
import useForm from "../../utils/useForm.jsx";
import { uploadObra } from "../../actions/newWorks.js"
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import axios from "axios";
import dataComunas from '../../utils/comunas.json'

const NuevaObra = () => {
  const {user} = useContext(AuthContext);

  const [empresas, setEmpresas] = useState([]);
  const [tiposObra, setTiposObra] = useState([]);
  const [estadosObra, setEstadosObra] = useState([]);
  const [comunas, setComunas] = useState([])
  const [cenes, setCene] = useState([])

  const { regiones } = dataComunas


  
  
  // const getRegiones = async () => {
  //   try {
  //     const res = await axios.get('https://apis.modernizacion.cl/dpa/regiones')
  //     consol
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const getEmpresas = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/empresas/')
      setEmpresas(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getTiposObra = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/tipos-obra/')
      setTiposObra(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getEstadosObra = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/estados-obra/')
      setEstadosObra(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  const getCeNe = async () => {    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/cene/`
      );
      setCene(data);
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

  useEffect(()=> {
    getEmpresas()
    getTiposObra()
    getEstadosObra()
    getCeNe()
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
    empresa: '',
    direccion: '',
    comuna: '',
    tipo_obra: '',
    estado_obra: '',
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
      <Sidebar />
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
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la direccion de la obra"
                name="direccion"
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
