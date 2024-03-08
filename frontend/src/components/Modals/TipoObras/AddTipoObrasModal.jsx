/* eslint-disable react/prop-types */
import useForm from "../../../utils/useForm"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { uploadTipoObra } from "../../../actions/newTipoObra"


const AddTipoObrasModal = ({ show, handleShow }) => {
  const { nombre, onInputChange, onResetForm } = useForm({
    nombre: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()
    uploadTipoObra(nombre)
    onResetForm()
    handleShow()
  }

  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Tipo de Obra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Nuevo tipo de obra</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              onChange={onInputChange}
              placeholder="Ingrese nombre de nuevo tipo de obra"
            />
          </Form.Group>
          <Button type="onSubmit" variant="danger">Crear</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddTipoObrasModal
