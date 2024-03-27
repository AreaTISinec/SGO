/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { getCeNes } from '../../../actions/getPetitions' 
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CeneModal = ({ show, handleShow }) => {
    const [cenes, setCenes] = useState([])

    const navigate = useNavigate()

    const handleClick = (valor) => {
        navigate('/obras', {
            state: {
                cene: valor
            }
        })
    }

    useEffect(()=> {
        getCeNes(setCenes)
    },[])

    return (
        <Modal show={show} onHide={handleShow} className='modalCene'>
            <Modal.Header closeButton>
                <Modal.Title>Listado de Centro de Negocios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Empresa</th>
                        </tr>
                    </thead> 
                    <tbody>
                    {
                        cenes?.map((cene)=>{
                            return(
                            <tr onClick={()=> handleClick(cene.id_cene)} key={cene.id_cene} style={{cursor: 'pointer'}} >
                                <td>{cene.id_cene}</td>
                                <td>{cene.nombre}</td>
                                <td>{cene.empresa}</td>
                            </tr>)
                        })
                    }
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}

export default CeneModal
