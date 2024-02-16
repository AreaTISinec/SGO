import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./NuevoCentroDeNegocios.css";
import useForm from "../../utils/useForm.jsx";
import { uploadCene } from "../../actions/newCene.js"
import axios from "axios";
import { useState, useEffect } from "react";

const NuevoCentroDeNegocios = () => {
  const [empresas, setEmpresas] = useState([]);

  const getEmpresas = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/empresas/')
      setEmpresas(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const {id_cene, nombre, empresa, onInputChange, onResetForm} = useForm({
    id_cene:'',
    nombre:'',
    empresa: 'Sinec'
  })

  const ceneRegex = /^[0-9a-zA-Z]*$/;

  useEffect(()=>{
    getEmpresas()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    if(ceneRegex.test(e.target["id_cene"].value)){
      uploadCene(id_cene,nombre, empresa)
    }else{
      console.log('no es valido')
    }
    onResetForm()
  };

  return (
    <div className="NuevoCentroDeNegociosContainer">
      <Sidebar />
      <div className="RecuadroNuevoCentroDeNegocios">
        <div>
          <Form className="formularioNuevoCene" onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>ID del Centro de Negocios</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el ID del Centro de Negocios"
                name="id_cene"
                onChange={ onInputChange }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Seleccione la empresa</Form.Label>
              <Form.Select
                onChange={ onInputChange }
                name="empresa"
                required
              >
                {
                  empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.nombre}> {empresa.nombre} </option>
                  ))
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nombre del Centro de Negocios</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del Centro de Negocios"
                name="nombre"
                onChange={ onInputChange }
                required
              />
            </Form.Group>

            <Button variant="danger" type="submit">
              Crear Centro de Negocios
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NuevoCentroDeNegocios;