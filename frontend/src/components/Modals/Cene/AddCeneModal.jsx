/* eslint-disable react/prop-types */

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { uploadCene } from '../../../actions/newCene'
import { useEffect } from 'react';
import { getEmpresas } from '../../../actions/getPetitions';
import { useState } from 'react';
import useForm from '../../../utils/useForm';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';


const AddCeneModal = ({ show, handleShow }) => {
    const [empresas, setEmpresas] = useState([]);
    const {id_cene, nombre, empresa, onInputChange, onResetForm} = useForm({
        id_cene:'',
        nombre:'',
        empresa: 'Sinec'
      })

    useEffect(()=> {
        getEmpresas(setEmpresas)
    }, [])

    const ceneRegex = /^[0-9a-zA-Z]{0,16}$/;

    const onSubmit = (e) => {
      e.preventDefault()
        if(ceneRegex.test(id_cene)){
            uploadCene(id_cene,nombre, empresa)
            onResetForm()
            handleShow()
          }else{
            console.log('no es valido')
          }
      }

    return (
        <Modal show={show} onHide={handleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Crear Nuevo Centro de Negocios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group>
                  <FloatingLabel
                    label='Ingrese el ID del Centro de Negocios'
                    className='mb-3'
                  >
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el ID del Centro de Negocios"
                      name="id_cene"
                      onChange={ onInputChange }
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group >
                  <FloatingLabel
                    label='Empresa'
                    className='mb-3'
                  >
                    <Form.Select
                      onChange={ onInputChange }
                      name="empresa"
                      required
                    >
                      <option value=''>Seleccion una empresa</option>
                      {
                        empresas.map((empresa) => (
                          <option key={empresa.id} value={empresa.nombre}> {empresa.nombre} </option>
                        ))
                      }
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group  >
                  <FloatingLabel
                    label='Ingrese el nombre del Centro de Negocios'
                    className='mb-3'
                  >
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre del Centro de Negocios"
                      name="nombre"
                      onChange={ onInputChange }
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Button variant="danger" type="submit">
                  Crear
                </Button>
              </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddCeneModal
