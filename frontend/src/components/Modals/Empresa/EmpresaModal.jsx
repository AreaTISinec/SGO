/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { getEmpresas } from '../../../actions/getPetitions' 
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EmpresaModal = ({ show, handleShow}) => {
  const [empresas, setEmpresas] = useState([])

  const navigate = useNavigate()

  const handleClick = (valor) => {
    navigate('/obras', {
      state: {
        empresa: valor
      }
    })
  }

  useEffect(()=>{
    getEmpresas(setEmpresas)
  }, [])

  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Listado de Empresas</Modal.Title>
      </Modal.Header>
      <Table>
        <thead>
        <tr>
          <th>Nombre Empresa</th>
        </tr>
        </thead>
        <tbody>
        {
          empresas?.map((empresa) => {
            return(
              <tr style={{cursor: 'pointer'}} key={empresa.id} onClick={()=> handleClick(empresa.nombre)}>
                <td>{empresa.nombre}</td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
    </Modal>
  )
}

export default EmpresaModal