/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { getTiposObra } from '../../../actions/getPetitions' 
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TiposObraModal = ({ show, handleShow}) => {
  const [tipos, setTipos] = useState([])

  const navigate = useNavigate()

  const handleClick = (valor) => {
    navigate('/obras', {
      state: {
        tipo_obra: valor
      }
    })
  }

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
              <tr onClick={()=>handleClick(tipo.nombre)} key={tipo.id} style={{cursor: 'pointer'}}>
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