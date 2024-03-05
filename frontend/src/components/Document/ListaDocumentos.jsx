import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import SidebarV2 from "../SidebarV2/SidebarV2";
import "./ListaDocumentos.css";
import { useParams } from "react-router-dom";

const ListaDocumentos = () => {
  const [listadoDeDocumentos, setListadoDeDocumentos] = useState([])
  const { idObra } = useParams()

  async function fetchListadoDocumentos() {
    try {
      const response = await axios.get(`https://sgo-django.azurewebsites.net/api/files/list/${idObra}/`)
      setListadoDeDocumentos(response.data)
    } catch (error){
      console.error('Error fetching de documentos', error)
    }
  }
  useEffect(() => {
    fetchListadoDocumentos();
  }, []);

  const handleDownload = async (documentId) => {
    try {
      const response = await axios.get(`https://sgo-django.azurewebsites.net/api/files/download/${documentId}/`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download','document.pdf');
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    }catch (error){
      console.error('Error en la descarga del documento', error)
    }
  }

  return (
    <div className="ListaDocumentoContainer">
      <SidebarV2 />
      <div className="RecuadroListaDocumentos">
        <div className="Titulo">
          <h1>Documentos de la obra</h1>
        </div>
        <Accordion className="AcordeonListaDocumentos">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Cartas Gantt</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                {listadoDeDocumentos?.map( document => 
                  {if(document.tipo == 'gantt')
                    return (
                  <ListGroup.Item className="ListaDocumentosDisponibles" key={document.id}>
                    {document.file_name}
                    <Button variant="danger" onClick={() => handleDownload(document.id)}>Descargar</Button>
                  </ListGroup.Item> )
                }
                )}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Cubicaciones</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
              {listadoDeDocumentos?.map( document => 
                  {if(document.tipo == 'cubicacion')
                    return (
                  <ListGroup.Item className="ListaDocumentosDisponibles" key={document.id}>
                    {document.file_name}
                    <Button variant="danger" onClick={() => handleDownload(document.id)}>Descargar</Button>
                  </ListGroup.Item> )
                }
                )}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Facturas</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
              {listadoDeDocumentos?.map( document => 
                  {if(document.tipo == 'facturas')
                    return (
                  <ListGroup.Item className="ListaDocumentosDisponibles" key={document.id}>
                    {document.file_name}
                    <Button variant="danger" onClick={() => handleDownload(document.id)}>Descargar</Button>
                  </ListGroup.Item> )
                }
                )}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Presupuestos</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
              {listadoDeDocumentos?.map( document => 
                  {if(document.tipo == 'presupuesto')
                    return (
                  <ListGroup.Item className="ListaDocumentosDisponibles" key={document.id}>
                    {document.file_name}
                    <Button variant="danger" onClick={() => handleDownload(document.id)}>Descargar</Button>
                  </ListGroup.Item> )
                }
                )}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default ListaDocumentos;