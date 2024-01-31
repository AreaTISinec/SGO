import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./NuevaObra.css";
import useForm from "../../utils/useForm.jsx";

const NuevaObra = () => {
  const { id, nombre, onInputChange, onResetForm } = useForm({ //agregar correctamente los parametros de la nueva obra
    id: "",
    nombre: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    //crear la funcion para guardar los datos
    onResetForm();
  };

  return (
    <div className="NuevaObra">
      <Sidebar />
      <div className="RecuadroNuevaObra">
        <div>
          <Form className="formularioNuevaObra" onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la fecha de inicio"
                name="fecha_inicio"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fecha de Termino</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la fecha de termino"
                name="fecha_termino"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fecha de Asignacion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la fecha de asignacion"
                name="fecha_asignacion"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Monto neto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el monto neto de la obra"
                name="monto_neto"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Empresa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la empresa"
                name="empresa"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la direccion de la obra"
                name="direccion"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Comuna</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la comuna de la obra"
                name="comuna"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Tipo de obra</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el tipo de obra"
                name="tipo_obra"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Estado de obra</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el estado de la obra"
                name="estado_obra"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese observaciones de la obra"
                name=""
                onChange={onInputChange}
              />
            </Form.Group>

            <Button variant="danger" type="onSubmit">
              Crear Obra
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NuevaObra;
