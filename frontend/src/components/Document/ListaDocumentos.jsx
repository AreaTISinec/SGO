import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import "./ListaDocumentos.css";

const ListaDocumentos = () => {
  const [listadoDeDocumentos, setListadoDeDocumentos] = useState([]);

  useEffect(() => {
    async function fetchListadoDocumentos() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/files/list/')
        console.log('response data')
        console.log(response.data)
        setListadoDeDocumentos(response.data)
      } catch (error){
        console.error('Error fetching de documentos', error)
      }
    }
    fetchListadoDocumentos();
    console.log(listadoDeDocumentos)
  }, []);

  const handleDownload = async (documentId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/files/download/${documentId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download','document.pdf');
      document.body.appendChild(link);
      link.click();
    }catch (error){
      console.error('Error en la descarga del documento', error)
    }
  }

  return (
    <div className="ListaDocumentoContainer">
      <Sidebar />
      <div className="RecuadroListaDocumentos">
        <div className="Titulo">
          <h1>Documentos de la obra</h1>
        </div>
        <Accordion className="AcordeonListaDocumentos">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Cartas Gantt</Accordion.Header>
            <Accordion.Body>
              {listadoDeDocumentos.length > 0 && (
                <ListGroup>
                {listadoDeDocumentos?.map( document => (
                  <ListGroup.Item className="ListaDocumentosDisponibles" key={document.id}>
                    {document.id_obra}
                    <Button variant="danger" onClick={() => handleDownload(document.id)}>Descargar</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Cubicaciones</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Cubicacion 1
                  <Button variant="danger">Descargar</Button>
                </ListGroup.Item>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Cubicacion 2
                  <Button variant="danger">Descargar</Button>
                </ListGroup.Item>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Cubicacion 3
                  <Button variant="danger">Descargar</Button>
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Facturas</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Factura 1
                  <Button variant="danger">Descargar</Button>
                </ListGroup.Item>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Factura 2
                  <Button variant="danger">Descargar</Button>
                </ListGroup.Item>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Factura 3
                  <Button variant="danger">Descargar</Button>
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Presupuestos</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Presupuesto 1
                  <Button variant="danger">Descargar</Button>
                </ListGroup.Item>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Presupuesto 2
                  <Button variant="danger">Descargar</Button>
                </ListGroup.Item>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Presupuesto 3
                  <Button variant="danger">Descargar</Button>
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default ListaDocumentos;
