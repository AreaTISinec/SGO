/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import useForm from '../../../utils/useForm'
import { uploadCliente } from '../../../actions/newCliente'

const ClienteModal = ({ show, handleShow }) => {

  const { rut, nombre, onInputChange, onResetForm } = useForm({
    rut: '',
    nombre: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()
    uploadCliente(rut, nombre)
    onResetForm()
    handleShow()
  }
  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Rut del Cliente</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Ingrese el rut del cliente'
              name='rut'
              onChange={onInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre del Cliente</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ingrese el nombre del cliente'
              name='nombre'
              onChange={onInputChange}
              required
            />
          </Form.Group>
          <Button type='onSubmit' variant='danger' >Crear</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ClienteModal
