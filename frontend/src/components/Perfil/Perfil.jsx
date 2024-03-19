import { useParams } from "react-router-dom"
import './Perfil.css'
import { useEffect, useState } from "react"

import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import  useForm  from '../../utils/useForm'
import SidebarV2 from "../SidebarV2/SidebarV2";

import { uploadDataUser, updateDataUser } from "../../actions/newDataUsers"
import { getEmpresa, getEmpresas, getEncargadoPorAcc } from "../../actions/getPetitions";


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
    getEmpresas(setEmpresas)
    getEncargadoPorAcc(idUsuario, setInfoUser);
    getEmpresa(infoUser?.empresa, setInfoEmpresa)
  }, [idUsuario, infoUser?.empresa]);
  

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
              <Button onClick={handleShowAP} variant="danger" >Editar Perfil</Button>
                  <Modal show={showAP} onHide={handleCloseAP}>
                    <Modal.Header closeButton>
                      <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={updateDataSubmit}>
                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingInput"
                            label='Ingrese su nombre'
                            className="mb-3"
                          >
                            <Form.Control 
                              type="text"
                              name="nombre"
                              placeholder="Ingrese su nombre"
                              onChange={onInputChange}
                              required
                            />
                          </FloatingLabel>
                        </Form.Group>

                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingInput"
                            label= 'Ingrese su apellido'
                            className="mb-3"
                          >
                            <Form.Control 
                              type="text"
                              name="apellido"
                              onChange={onInputChange}
                              placeholder=""
                              required
                            />

                          </FloatingLabel>
                        </Form.Group>

                        <Form.Group>
                          <FloatingLabel
                            label="Ingrese su numero"
                            controlId='floatingInput'
                            className="mb-3"
                          >
                            <Form.Control 
                              type="text"
                              name="numero"
                              placeholder=""
                              onChange={onInputChange}
                              required
                            />
                          </FloatingLabel>
                        </Form.Group>

                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingSelect"
                            label='Ingrese la impresa'
                            className="mb-3"
                          >
                            <Form.Select 
                              name="empresa"
                              onChange={onInputChange}
                              required
                            >
                              <option value=''>Seleccione una Empresa</option>
                              {
                                empresas?.map((empresa) => (
                                  <option key={empresa.id} value={empresa.id}> {empresa.nombre} </option>
                                ))
                              }
                            </Form.Select>

                          </FloatingLabel>
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
                          <FloatingLabel
                            controlId="floatingInput"
                            label='Ingrese su nombre'
                            className="mb-3"
                          >
                            <Form.Control 
                              type="text"
                              name="nombre"
                              placeholder="Ingrese su nombre"
                              onChange={onInputChange}
                              required
                            />
                          </FloatingLabel>
                        </Form.Group>

                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingInput"
                            label= 'Ingrese su apellido'
                            className="mb-3"
                          >
                            <Form.Control 
                              type="text"
                              name="apellido"
                              onChange={onInputChange}
                              placeholder=""
                              required
                            />

                          </FloatingLabel>
                        </Form.Group>

                        <Form.Group>
                          <FloatingLabel
                            label="Ingrese su numero"
                            controlId='floatingInput'
                            className="mb-3"
                          >
                            <Form.Control 
                              type="text"
                              name="numero"
                              placeholder=""
                              onChange={onInputChange}
                              required
                            />
                          </FloatingLabel>
                        </Form.Group>

                        <Form.Group>
                          <FloatingLabel
                            controlId="floatingSelect"
                            label='Ingrese la impresa'
                            className="mb-3"
                          >
                            <Form.Select 
                              name="empresa"
                              onChange={onInputChange}
                              required
                            >
                              <option value=''>Seleccione una Empresa</option>
                              {
                                empresas?.map((empresa) => (
                                  <option key={empresa.id} value={empresa.id}> {empresa.nombre} </option>
                                ))
                              }
                            </Form.Select>

                          </FloatingLabel>
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