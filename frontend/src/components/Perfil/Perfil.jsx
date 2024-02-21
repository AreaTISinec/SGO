import { useParams } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar"
import './Perfil.css'
import axios from "axios"
import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

const Perfil = () => {
  const { idUsuario } = useParams()

  const [infoUser, setInfoUser] = useState({})
  const [infoEmpresa, setInfoEmpresa] = useState([])
  const [showAP, setShowAP] = useState(false);

  const handleCloseAP = () => setShowAP(false);
  const handleShowAP = () => setShowAP(true);


  const getDatosUser = async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/profile/${idUsuario}/`);
      setInfoUser(data);
    } catch (error) {
      console.error(error)
    }
    
    console.log('infoUser')
    console.log(infoUser)
  };

  const getDatosEmpresa = async () => {
    try {
      const { data } = await axios.get('http://127.0.0.1:8000/api/empresas/')
      setInfoEmpresa(data);
    } catch (error) {
      console.error(error)
    }
    console.log(infoEmpresa)
  };

  useEffect(() => {
    getDatosUser();
    getDatosEmpresa();
  }, []);

  return (
    <div className="PerfilContainer">
      <Sidebar/>
      <div className="RecuadroPerfil">
        <div className="Titulo">
          <h1>Perfil de Usuario</h1>
          <span>nombre= {infoUser.nombre}</span>
          <span>apellido= {infoUser.apellido}</span>
          <span>empresa= { (infoUser && infoEmpresa && infoUser.empresa == infoEmpresa[infoUser.empresa - 1].id) ? infoEmpresa[infoUser.empresa - 1].nombre : 'error'}</span>
          <span>celular= {infoUser.numero}</span>
          {
            infoUser ?
            <>
              <Button onClick={handleShowAP} variant="danger" className="boton-avance">Editar Perfil</Button>
                  <Modal show={showAP} onHide={handleCloseAP}>
                    <Modal.Header closeButton>
                      <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form >
                        <Form.Group>
                          <Form.Label>Ingresa tu nombre</Form.Label>
                          <Form.Control 
                            type="text"
                            name="hitos"
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Ingresa tu apellido</Form.Label>
                          <Form.Control 
                            type="text"
                            name="hitos"
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Ingresa tu celular</Form.Label>
                          <Form.Control 
                            type="text"
                            name="hitos"
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>¿A que empresa perteneces?</Form.Label>
                          <Form.Control 
                            type="text"
                            name="hitos"
                            required
                          />
                        </Form.Group>

                        <Button variant="danger" type="onSubmit">
                          Guardar Cambios
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
            </>:
            <></>
          }
        </div>
      </div>
    </div>
  )
}

export default Perfil

/*
  const [showAP, setShowAP] = useState(false);

  const handleCloseAP = () => setShowAP(false);
  const handleShowAP = () => setShowAP(true);

{
            infoUser ?
            <>
              <Button onClick={handleShowAP} variant="danger" className="boton-avance">Subir Avance Proyectado</Button>
                  <Modal show={showAP} onHide={handleCloseAP}>
                    <Modal.Header closeButton>
                      <Modal.Title>Definir Avance Proyectado</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form >
                        <Form.Group>
                          <Form.Label>Ingrese la cantidad de hitos</Form.Label>
                          <Form.Control 
                            type="number"
                            name="hitos"
                            required
                          />
                        </Form.Group>
                      
                      <Button variant="primary" type="onSubmit">
                        Guardar Avance
                      </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
            </>:
            <></>
          }
*/