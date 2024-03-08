/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { getTiposObra } from '../../../actions/getPetitions' 
import { useEffect, useState } from 'react'

const TiposObraModal = ({ show, handleShow}) => {
  const [tipos, setTipos] = useState([])

  useEffect(()=>{
    getTiposObra(setTipos)
  },[])
  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Listado de Tipos de Obras</Modal.Title>
      </Modal.Header>
      <Table>
        <thead>
          <tr>
            <th>Tipo de Obra</th>
          </tr>
        </thead>
        <tbody>
        {
          tipos?.map((tipo) => {
            return(
              <tr key={tipo.id}>
                <td>{tipo.nombre}</td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
    </Modal>
  )
}

export default TiposObraModal