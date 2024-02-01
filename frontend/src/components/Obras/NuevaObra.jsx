import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./NuevaObra.css";
import useForm from "../../utils/useForm.jsx";
import { uploadObra } from "../../actions/newWorks.js"
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";

const NuevaObra = () => {
  const {user} = useContext(AuthContext)
  
  const { fecha_inicio, fecha_termino, fecha_asignacion, monto_neto, empresa, direccion, comuna, tipo_obra, estado_obra, observaciones, porc_avance, monto_facturado, saldo_facturado, id_user, onInputChange, onResetForm } = useForm({ //agregar correctamente los parametros de la nueva obra
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
    porc_avance: 10, 
    monto_facturado: 0, 
    saldo_facturado: 0, 
    id_user: user.user_id
  });

  const onSubmit = (e) => {
    e.preventDefault();
    uploadObra(fecha_inicio, fecha_termino, fecha_asignacion, monto_neto, empresa, direccion, comuna, tipo_obra, estado_obra, observaciones, porc_avance, monto_facturado, saldo_facturado, id_user)  
    onResetForm();
  };

  return (
    <div className="NuevaObra">
      <Sidebar />
      <div className="RecuadroNuevaObra">
        <div>
          <Form className="formularioNuevaObra" onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ingrese la fecha de inicio"
                name="fecha_inicio"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fecha de Termino</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ingrese la fecha de termino"
                name="fecha_termino"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fecha de Asignacion</Form.Label>
              <Form.Control
                type="date"
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
