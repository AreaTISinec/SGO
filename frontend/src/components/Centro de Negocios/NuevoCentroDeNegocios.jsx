import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./NuevoCentroDeNegocios.css";
import useForm from "../../utils/useForm.jsx";
import { uploadCene } from "../../actions/newCene.js"

const NuevoCentroDeNegocios = () => {
  
  const {id_cene, nombre, empresa, onInputChange, onResetForm} = useForm({
    id_cene:'',
    nombre:'',
    empresa: 'sinelec'
  })

  const ceneRegex = /^[0-9a-zA-Z]*$/;

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
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el tipo de documento"
                name="id_cene"
                onChange={ onInputChange }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nombre del Centro de Negocios</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del documento"
                name="nombre"
                onChange={onInputChange}
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