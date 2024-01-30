import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./NuevaObra.css";
import useForm from "../../utils/useForm.jsx";

const NuevaObra = () => {
  
  const {id, nombre, onInputChange, onResetForm} = useForm({
    id:'',
    nombre:''
  })

  const onSubmit = (e) => {
    e.preventDefault();
    
    onResetForm()
  };

  return (
    <div className="NuevoCentroDeNegociosContainer">
      <Sidebar />
      <div className="RecuadroNuevoCentroDeNegocios">
        <div>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el tipo de documento"
                name="id"
                onChange={onInputChange}
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

            <Button variant="danger" type="onSubmit">
              Crear Centro de Negocios
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NuevaObra;