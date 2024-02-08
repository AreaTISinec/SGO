import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import Sidebar from "../Sidebar/Sidebar";
import "./ListaDocumentos.css";

const ListaDocumentos = () => {
  // const [obrasData, setObrasData] = useState([]);
  // const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // const { user } = useContext(AuthContext);

  // const filterObrasByDirec = (searchTerm) => {
  //   if (!Array.isArray(obrasData)) {
  //     return [];
  //   }
  //   if (searchTerm.trim() === "") {
  //     return obrasData;
  //   } else {
  //     return obrasData.filter((obra) =>
  //       obra.direccion.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }
  // };

  // const getDatos = async () => {
  //   try {
  //     const id = user.user_id
  //     if (user.rol == 1 || user.rol == 2 || user.rol == 5) {
  //       const { data } = await axios.get(`http://127.0.0.1:8000/api/obras/`);
  //       setObrasData(data);
  //     } else {
  //       const { data } = await axios.get(
  //         `http://127.0.0.1:8000/api/obras/user/${id}/`
  //       );
  //       setObrasData(data);
  //       console.log(obrasData)
  //     }
  //   } catch (err) {
  //     console.error("Error al obtener datos:", err);
  //   }
  // };

  // useEffect(() => {
  //   getDatos();
  // }, [searchTerm]);

  return (
    <div className="ListaDocumentoContainer">
      <Sidebar />
      <div className="RecuadroListaDocumentos">
        <Accordion className="AcordeonListaDocumentos">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Cartas Gantt</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Carta Gantt 1
                  <Button variant="danger">Descargar</Button>  
                </ListGroup.Item>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Carta Gantt 2
                  <Button variant="danger">Descargar</Button>
                </ListGroup.Item>
                <ListGroup.Item className="ListaDocumentosDisponibles">
                  Carta Gantt 3
                  <Button variant="danger">Descargar</Button>
                </ListGroup.Item>
              </ListGroup>
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
