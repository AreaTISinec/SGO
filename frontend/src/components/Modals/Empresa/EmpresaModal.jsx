/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { getEmpresas } from '../../../actions/getPetitions' 
import { useEffect, useState } from 'react'

const EmpresaModal = ({ show, handleShow}) => {
  const [empresas, setEmpresas] = useState([])

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
              <tr key={empresa.id}>
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