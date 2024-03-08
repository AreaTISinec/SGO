/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { getClientes } from '../../../actions/getPetitions' 
import { useEffect, useState } from 'react'

const ClienteModal = ({ show, handleShow}) => {
    const [clientes, setClientes] = useState([])

    useEffect(()=> {
        getClientes(setClientes)
    }, [])

    return (
        <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
            <Modal.Title>Lista de Clientes</Modal.Title>
        </Modal.Header>
        <Table>
            <thead>
                <tr>
                    <th>Rut</th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {
                    clientes?.map((cliente)=>{
                        return(
                            <tr key={cliente.rut}>
                                <td>{cliente.rut}</td>
                                <td>{cliente.nombre}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </Modal>
    )
}

export default ClienteModal