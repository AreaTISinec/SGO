import SidebarV2 from "../../components/SidebarV2/SidebarV2"
import Table from 'react-bootstrap/Table';
import "./AvanceFinanciero.css"
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import  useForm  from '../../utils/useForm'
import { useParams } from "react-router-dom";
import { getDetalleObra, getSupervisores, getHistorialFinanciero, getEmpresas } from "../../actions/getPetitions";
import { uploadAvanceFinanciero } from "../../actions/newAvance";
import AuthContext from "../../context/AuthContext";
import { upload } from "../../actions/docs";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";


const AvanceFinanciero = () => {
    const { profile } =useContext(AuthContext)
    const [responsables, setResponsables] = useState([])
    const { idObra } = useParams()
    const [showAP, setShowAP] = useState(false);
    const [fechaActual, setFechaActual] = useState('')
    const [obra, setObra] = useState({})
    const [historialFinanciero, setHistorialFinanciero] = useState([])
    const [empresas, setEmpresas] = useState([])

    

    
    const handleCloseAP = () => setShowAP(false);
    const handleShowAP = () => setShowAP(true);
    
    useEffect(()=> {
        const fecha = new Date().toISOString().split('T')[0];
        setFechaActual(fecha)
        getDetalleObra(idObra, setObra)
        //obtenerHistorialFinanciero()
        getHistorialFinanciero(setHistorialFinanciero, idObra);
        getSupervisores(setResponsables)
        getEmpresas(setEmpresas)
    }, [idObra])


    const [docData, setDocData] = useState({
        id_obra: idObra,
        tipo: "facturas",
        doc: null,
    });
    
    const { tipo, doc, id_obra } = docData;    

    
    const { monto, empresa, factura, fecha, onInputChange, onResetForm } = useForm({
        monto: 0,
        empresa: 1,
        factura: 0,
        fecha: fechaActual

      })

    const onSubmit = (e) => {
        e.preventDefault()
        uploadAvanceFinanciero(fecha, parseInt(monto), parseInt(idObra), profile.id, obra.presupuesto, empresa, factura)
        upload(doc, tipo, id_obra);
        onResetForm()
        handleCloseAP()

    }
    
    
      const onFileChange = (e) => {
        setDocData({ ...docData, doc: e.target.files[0] });
      };

    

    return (
        <div className="AvancesContainer">
            <SidebarV2 />
            <div className="RecuadroAvances">
                <div className="Titulo">
                    <h1>Avance Financiero</h1>
                </div>
                <div className="DetalleAvanceFinanciero">
                    <div className="Datos"><span><strong>Presupuesto: </strong></span><span className=""> $ {obra.presupuesto}</span></div>
                    <div className="Datos"><strong>Total Facturado: </strong><span className=""> $ {obra.monto_facturado}</span></div>
                    <div className="Datos"><strong>Monto por Facturar: </strong><span className=""> $ {obra.monto_por_facturar}</span></div>
                    <div className="Datos"><strong>Porcentaje Facturado: </strong><span className="">{obra.porc_avance_financiero} %</span></div>
                </div>
                <div className="Botonera">
                    <Button variant="danger" onClick={handleShowAP}>Agregar avance financiero</Button>
                    <Modal show={showAP} onHide={handleCloseAP}>
                        <Modal.Header closeButton>
                        <Modal.Title>Ultimo avance financiero</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e) => {onSubmit(e)}}>
                                <Form.Group>
                                    <FloatingLabel
                                        label='Ingrese la fecha'
                                        className="mb-3"
                                    >
                                        <Form.Control 
                                            type="date"
                                            name="fecha"
                                            onChange={onInputChange}
                                            
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group>
                                    <FloatingLabel
                                        label='Ingrese el monto facturado'
                                        className="mb-3"
                                    >
                                        <Form.Control 
                                            type="number"
                                            name="monto"
                                            placeholder=""
                                            onChange={onInputChange}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group>
                                    <FloatingLabel
                                        label='Ingrese el numero de factura'
                                        className="mb-3"
                                    >
                                        <Form.Control 
                                            type="number"
                                            name="factura"
                                            placeholder=""
                                            onChange={onInputChange}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Documento Factura</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="archivo"
                                        onChange={(e)=> onFileChange(e)}
                                        className="mb-3"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <FloatingLabel
                                        label='Empresa'
                                        className="mb-3"
                                    >
                                        <Form.Select
                                            onChange={onInputChange}
                                            name="empresa"
                                        >
                                            <option value=''>Seleccione la Empresa</option>
                                            {
                                                empresas?.map((empresa)=>
                                                    <option key={empresa.id} value={empresa.id}>{empresa.nombre}</option>
                                                )
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                    
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
                                <th>Empresa</th>
                                <th>Numero de Factura</th>
                                <th>Monto</th>
                                <th>Porcentaje</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        historialFinanciero.length > 0 && historialFinanciero ?
                            (historialFinanciero.map((row)=>{
                                const responsable = responsables.find(r => r.id === row.responsable)
                                const empresa = empresas.find(r => r.id == row.empresa)
                                
                                console.log(empresa)
                                    return (
                                        <tr key={row.id}>
                                            <td>
                                            {responsable?.nombre} {responsable?.apellido}
                                            </td>
                                            <td>{row.fecha}</td>
                                            <td>{empresa?.nombre}</td>
                                            <td>{row.numero_factura}</td>
                                            <td>$ {row.monto}</td>
                                            <td>{row.porcentaje} %</td>
                                        </tr>
                                    )}
                                )
                            ):
                            <></>
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default AvanceFinanciero
