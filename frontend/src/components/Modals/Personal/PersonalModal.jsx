/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { getEmpresas, getSupervisores } from '../../../actions/getPetitions'
import { useEffect, useState } from 'react' 

const PersonalModal = ({ show, handleShow }) => {
  const [personal, setPersonal] = useState([])
  // const [cuentas, setCuentas] = useState([])
  const [empresas, setEmpresas] = useState([])


  useEffect(()=> {
    getSupervisores(setPersonal)
    getEmpresas(setEmpresas)
  }, [])

  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Lista del Personal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>Numero</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {
              personal?.map((persona) => {
                const empresa = empresas.find(e => e.id===persona.empresa)
                return(
                  <tr key={persona.id}>
                    <td>{persona.nombre} {persona.apellido}</td>
                    <td>{empresa?.nombre}</td>
                    <td>{persona.numero}</td>
                    <td>{}Correo@correo</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  )
}

export default PersonalModal
