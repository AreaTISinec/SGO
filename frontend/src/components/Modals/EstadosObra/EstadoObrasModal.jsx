/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { getEstadosObra } from '../../../actions/getPetitions' 
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EstadoObrasModal = ({ show, handleShow}) => {
  const [estados, setEstados] = useState([])

  const navigate = useNavigate()

  const handleClick = (valor) => {
    navigate('/obras', {
      state: {
        estado_obra: valor
      }
    })
  } 

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
              <tr onClick={()=> handleClick(estado.estado)} key={estado.id} style={{cursor: 'pointer'}}>
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
