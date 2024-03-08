/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import useForm from '../../../utils/useForm'
import { uploadEmpresa } from '../../../actions/newEmpresa'

const AddEmpresaModal = ({ show, handleShow }) => {
  const { nombre, onInputChange, onResetForm} = useForm({
    nombre: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()
    uploadEmpresa(nombre)
    onResetForm()
    handleShow()
  }

  return (
    <Modal show={show} onHide={handleShow} >
      <Modal.Header closeButton>
        <Modal.Title>Crear Nueva Empresa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Nombre de la Empresa</Form.Label>
            <Form.Control
              type='text'
              name='nombre'
              onChange={onInputChange}
              placeholder='Ingrese el nombre de la empresa'
            />
          </Form.Group>
          <Button type='onSubmit' variant='danger' >Crear</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddEmpresaModal
