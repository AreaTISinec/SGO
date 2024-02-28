import SidebarV2 from "../../components/SidebarV2/SidebarV2"
import Table from 'react-bootstrap/Table';
import "./AvanceFinanciero.css"
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";


const AvanceFinanciero = () => {

    const [showAP, setShowAP] = useState(false);
    const [fechaActual, setFechaActual] = useState('')

    const handleCloseAP = () => setShowAP(false);
    const handleShowAP = () => setShowAP(true);

    useEffect(()=> {
        const fecha = new Date().toISOString().split('T')[0];
        setFechaActual(fecha)
    },[])



    return (
        <div className="AvancesContainer">
            <SidebarV2 />
            <div className="RecuadroAvances">
            <div className="Titulo">
            <h1>Avance Financiero</h1>
            </div>
            <div className="DetalleAvanceFinanciero">
                <div className="Datos"><span><strong>Presupuesto: </strong></span><span className=""> ${}6565656565</span></div>
                <div className="Datos"><strong>Total Facturado: </strong><span className=""> ${}45455</span></div>
                <div className="Datos"><strong>Monto por Facturar: </strong><span className=""> ${}454</span></div>
            </div>
            <div className="Botonera">
                <Button variant="danger" onClick={handleShowAP}>Agregar avance financiero</Button>
                <Modal show={showAP} onHide={handleCloseAP}>
                    <Modal.Header closeButton>
                    <Modal.Title>Ultimo avance financiero</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control 
                                    type="date"
                                    name="fecha"
                                    value={fechaActual}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Ingrese el monto Facturado</Form.Label>
                                <Form.Control 
                                    type="number"
                                    name="monto_facturado"
                                />
                            </Form.Group>
                            <Button variant="danger" type="onSubmit">Guardar</Button>
                        </Form>
                    
                    </Modal.Body>
                </Modal>
            </div>
            <div className="Historial">
                <h3>Historial</h3>
                <Table >
                    <thead>
                        <tr>
                            <th>Responsable</th>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Porcentaje</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tomas Landaeta</td>
                            <td>20/20/2020</td>
                            <td>123456</td>
                            <td>11%</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            </div>
        </div>
    )
}

export default AvanceFinanciero
