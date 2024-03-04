import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { upload } from "../../actions/docs";
import {  useState } from "react";
import { useParams } from "react-router-dom";
import SidebarV2 from "../../components/SidebarV2/SidebarV2";
import "./UploadFile.css";

const UploadFile = () => {
  const { idObra } = useParams();

  const [formData, setFormData] = useState({
    id_obra: idObra,
    tipo: "",
    doc: null,
  });
  const { tipo, doc, id_obra } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  
  const onSubmit = (e) => {
    e.preventDefault();
    //const hoy = new Date();
    //const nuevoNombre = `${tipo}_${doc.name}_${hoy.toISOString()}`
    upload(doc, tipo, id_obra);
    
  };


  const onFileChange = (e) => {
    setFormData({ ...formData, doc: e.target.files[0] });
    console.log(e.target.files);
  };

  return (
    <div className="UploadContainer">
      <SidebarV2 />
      <div className="RecuadroUploadFiles">
        <div>
          <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group className="mb-3" >
              <Form.Label>Tipo de obra</Form.Label>
              <Form.Select name = "tipo" onChange={(e) => onChange(e)}>
                <option value="presupuesto">Presupuesto</option>
                <option value="gantt">Carta Gantt</option>
                <option value="facturas">Factura</option>
                <option value="cubicacion">Cubicacion</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nombre del Documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del documento"
                name="nombre"
                onChange={(e) => onChange(e)}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Archivo</Form.Label>
              <Form.Control
                type="file"
                placeholder="Ingrese el nombre del documento"
                name="doc"
                onChange={(e) => onFileChange(e)}
              />
            </Form.Group>

            <Button variant="danger" type="submit">
              Subir archivo
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;

