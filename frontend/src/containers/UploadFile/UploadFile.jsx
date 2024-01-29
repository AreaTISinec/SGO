import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { upload } from "../../actions/docs";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./UploadFile.css";

const UploadFile = () => {
  const [formData, setFormData] = useState({
    id_obra: 1,
    tipo: "",
    doc: null,
  });

  const { id_obra, tipo, doc } = formData;
  console.log(formData);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Props antes de ejecutar onSubmit:', upload);
    upload(doc, tipo, id_obra);
  };

  const onFileChange = (e) => {
    setFormData({ ...formData, doc: e.target.files[0] });
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

            <Button variant="danger" type="onSubmit">
              Subir archivo
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;

/* eslint-disable react-refresh/only-export-components */
/*
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { upload } from '../actions/docs';
import { useState } from 'react';
import { connect } from 'react-redux';



// eslint-disable-next-line react/prop-types
const UploadFile = ({ upload }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        tipo: '',
        doc: null,
    })

    const {nombre, tipo, doc} = formData

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = (e) => {
        e.preventDefault()
        upload(doc, nombre, tipo)
    }

  return (
    
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="">
            <Form.Label>Tipo de Documento</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Ingrese el tipo de obra" 
            name='tipo'
            onChange={e => onChange(e)}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Nombre del Documento</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Ingrese el nombre del documento" 
            name='nombre'
            onChange={e => onChange(e)}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Archivo</Form.Label>
            <Form.Control 
            type="file" 
            placeholder="Ingrese el nombre del documento" 
            name='doc'
            />
        </Form.Group>
        
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
    
  )
}

export default connect(null, {upload})(UploadFile)
*/
