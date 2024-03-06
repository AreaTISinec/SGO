/* eslint-disable react/prop-types */

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { uploadCene } from '../../../actions/newCene'
import { useEffect } from 'react';
import { getEmpresas } from '../../../actions/getPetitions';
import { useState } from 'react';
import useForm from '../../../utils/useForm';


const CeneModal = ({ show, handleClose }) => {
    const [empresas, setEmpresas] = useState([]);
    const {id_cene, nombre, empresa, onInputChange, onResetForm} = useForm({
        id_cene:'',
        nombre:'',
        empresa: 'Sinec'
      })

    useEffect(()=> {
        getEmpresas(setEmpresas)
    }, [])

    const ceneRegex = /^[0-9a-zA-Z]*$/;

    const onSubmit = (e) => {
        if(ceneRegex.test(e.target["id_cene"].value)){
            uploadCene(id_cene,nombre, empresa)
          }else{
            console.log('no es valido')
          }
        onResetForm()
        handleClose()
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Crear Nuevo Centro de Negocios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form className="formularioNuevoCene" onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>ID del Centro de Negocios</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el ID del Centro de Negocios"
                name="id_cene"
                onChange={ onInputChange }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Seleccione la empresa</Form.Label>
              <Form.Select
                onChange={ onInputChange }
                name="empresa"
                required
              >
                {
                  empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.nombre}> {empresa.nombre} </option>
                  ))
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nombre del Centro de Negocios</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del Centro de Negocios"
                name="nombre"
                onChange={ onInputChange }
                required
              />
            </Form.Group>

            <Button variant="danger" type="submit">
              Crear
            </Button>
          </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CeneModal
