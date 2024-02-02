import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { upload } from "../../actions/docs";
import {  useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./UploadFile.css";

const UploadFile = ({ id }) => {

  
  
  
  const [formData, setFormData] = useState({
    nombre: '',
    id_obra: id,
    tipo: "",
    doc: null,
  });
  const { nombre, tipo, doc, id_obra } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  
  const onSubmit = (e) => {
    e.preventDefault();
    upload(doc,nombre, tipo, id_obra);
    console.log(id_obra)
  };

  const onFileChange = (e) => {
    setFormData({ ...formData, doc: e.target.files[0] });
    console.log(e.target.files);
  };

  return (
    <div className="UploadContainer">
      <Sidebar />
      <div className="RecuadroUploadFiles">
        <div>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Tipo de Documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el tipo de documento"
                name="tipo"
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nombre del Documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del documento"
                name="nombre"
                onChange={(e) => onChange(e)}
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

