/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { getClientes } from '../../../actions/getPetitions' 
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ClienteModal = ({ show, handleShow}) => {
    const navigate = useNavigate()
    const [clientes, setClientes] = useState([])

    useEffect(()=> {
        getClientes(setClientes)
    }, [])

    const handleNavigate = (valor) => {
        navigate('/obras', {
            state: {
                cliente: valor
            }
        })
    }

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
                            <tr style={{cursor: 'pointer'}} key={cliente.rut} onClick={() => handleNavigate(cliente.nombre)}>
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