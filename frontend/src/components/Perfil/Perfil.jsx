import { useParams } from "react-router-dom"
import SidebarV2 from "../SidebarV2/SidebarV2";
import './Perfil.css'
import axios from "axios"
import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import  useForm  from '../../utils/useForm'
import { uploadDataUser, updateDataUser } from "../../actions/newDataUsers"

const Perfil = () => {
  const { idUsuario } = useParams()

  const [infoUser, setInfoUser] = useState({});
  const [infoEmpresa, setInfoEmpresa] = useState({});
  const [empresas, setEmpresas] = useState([]);
  const [showAP, setShowAP] = useState(false);

  const { nombre, apellido, numero, empresa, onInputChange, onResetForm } = useForm({
    nombre: '',
    apellido: '',
    numero: '',
    empresa: 0
  })

  const handleCloseAP = () => setShowAP(false);
  const handleShowAP = () => setShowAP(true);


  const getDatosUser = async () => {
    try {
      const { data } = await axios.get(`https://sgo-django.azurewebsites.net/api/profile/${idUsuario}/`);
      setInfoUser(data);
    } catch (error) {
      console.error(error)
    }

  };

  const getEmpresasUser= async () => {
    try {
        const { data } = await axios.get(`https://sgo-django.azurewebsites.net/api/empresas/${infoUser?.empresa}/`)
        setInfoEmpresa(data);      
    } catch (error) {
      console.error(error)
    }
  }

 
  const getEmpresas = async () => {
    try {
      const response = await axios.get('https://sgo-django.azurewebsites.net/api/empresas/')
      setEmpresas(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const newDataSubmit = (e) => {
    e.preventDefault()

    uploadDataUser(idUsuario, nombre, apellido, numero, empresa)
    setInfoUser({nombre: nombre, apellido: apellido, numero: numero, empresa: empresa})
    setInfoEmpresa({...infoEmpresa, nombre: empresa})

    onResetForm()
  }
  const updateDataSubmit = (e) => {
    e.preventDefault()

    updateDataUser(idUsuario, nombre, apellido, numero, empresa)
    setInfoUser({nombre: nombre, apellido: apellido, numero: numero, empresa: empresa})
    setInfoEmpresa({...infoEmpresa, nombre: empresa})

    onResetForm()
  }
  
  useEffect(() => {
    getDatosUser();
    getEmpresas();
  }, []);
  
   useEffect(() => {
    getEmpresasUser();
  }, [infoUser]);

  return (
    <div className="PerfilContainer">
      <SidebarV2 />
      <div className="RecuadroPerfil">
        <div className="Titulo">
          <h1>Perfil de Usuario</h1>
        </div>
        <div className="DatosDelPerfil">
          <span>nombre= {infoUser.nombre}</span>
          <span>apellido= {infoUser.apellido}</span>
          <span>empresa= {infoEmpresa.nombre}</span>
          <span>numero= {infoUser.numero}</span>
          {
            Object.keys(infoUser).length !== 0 ?
            (<>
              <Button onClick={handleShowAP} variant="danger" className="">Editar Perfil</Button>
                  <Modal show={showAP} onHide={handleCloseAP}>
                    <Modal.Header closeButton>
                      <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={updateDataSubmit}>
                        <Form.Group>
                          <Form.Label>Ingresa tu nombre</Form.Label>
                          <Form.Control 
                            type="text"
                            name="nombre"
                            onChange={onInputChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Ingresa tu apellido</Form.Label>
                          <Form.Control 
                            type="text"
                            name="apellido"
                            onChange={onInputChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Ingresa tu celular</Form.Label>
                          <Form.Control 
                            type="text"
                            name="numero"
                            onChange={onInputChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>¿A que empresa perteneces?</Form.Label>
                          <Form.Select 
                            name="empresa"
                            onChange={onInputChange}
                            required
                          >
                            {
                              empresas?.map((empresa) => (
                                <option key={empresa.id} value={empresa.id}> {empresa.nombre} </option>
                              ))
                            }
                          </Form.Select>
                        </Form.Group>

                        <Button variant="danger" type="onSubmit">
                          Guardar Cambios
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
            </>):
            (<><Button onClick={handleShowAP} variant="danger" className="boton-avance">Cargar Perfil</Button>
                  <Modal show={showAP} onHide={handleCloseAP}>
                    <Modal.Header closeButton>
                      <Modal.Title>Cargar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={newDataSubmit}>
                        <Form.Group>
                          <Form.Label>Ingresa tu nombre</Form.Label>
                          <Form.Control 
                            type="text"
                            name="nombre"
                            onChange={onInputChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Ingresa tu apellido</Form.Label>
                          <Form.Control 
                            type="text"
                            name="apellido"
                            onChange={onInputChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Ingresa tu celular</Form.Label>
                          <Form.Control 
                            type="text"
                            name="numero"
                            onChange={onInputChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>¿A que empresa perteneces?</Form.Label>
                          <Form.Select 
                            name="empresa"
                            onChange={onInputChange}
                            required
                          >
                            {
                              empresas?.map((empresa) => (
                                <option key={empresa.id} value={empresa.id}> {empresa.nombre} </option>
                              ))
                            }
                          </Form.Select>
                        </Form.Group>

                        <Button variant="danger" type="onSubmit">
                          Guardar Cambios
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal></>)
          }
        </div>
        <>.</>  
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