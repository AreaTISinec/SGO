/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { getEstadosObra } from '../../../actions/getPetitions' 
import { useEffect, useState } from 'react'

const EstadoObrasModal = ({ show, handleShow}) => {
  const [estados, setEstados] = useState([])

  useEffect(()=>{
    getEstadosObra(setEstados)
  }, [])
  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Listado de Estados de Obra</Modal.Title>
      </Modal.Header>
      <Table>
        <thead>
        <tr>
          <th>Estado de Obra</th> 
        </tr>
        </thead>
        <tbody>
        {
          estados?.map((estado)=>{
            return(
              <tr key={estado.id}>
                <td>{estado.estado}</td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
    </Modal>
  )
}

export default EstadoObrasModal
