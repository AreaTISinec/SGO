import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import SidebarV2 from "../../components/SidebarV2/SidebarV2"
import "./AvanceOperativo.css"
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { useState, useEffect } from "react";
import { getAccessToken, getAvances, getDetalleObra } from "../../actions/getPetitions";
import { useParams } from "react-router-dom";
import { uploadAvanceProyectado, uploadAvanceReal } from "../../actions/newAvance";
import useForm from "../../utils/useForm";
import swal from "sweetalert2";


const AvanceOperativo = () => {
  const { idObra } = useParams();
  const [detalleObra, setDetalleObra] = useState({})
  const [accessToken, setAccessToken] = useState('');
  const [avances, setAvances] = useState([])
  const [avancesReales, setAvancesReales] = useState([])
  const [hitos, setHitos] = useState([{}])
  const [errores, setErrores] = useState([]);
  const [showAP, setShowAP] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [numHitos, setNumHitos] = useState(0);
  const [fechaActual, setFechaActual] = useState('')
  const [proxAvance, setProxAvance] = useState({})


  const handleCloseAP = () => setShowAP(false);
  const handleShowAP = () => setShowAP(true);
  const handleCloseAR = () => setShowAR(false);
  const handleShowAR = () => setShowAR(true);

  useEffect(() => {
    getAccessToken(setAccessToken)
    getDetalleObra(idObra, setDetalleObra)
    const fecha = new Date().toISOString().split('T')[0];
    setFechaActual(fecha)
  }, [idObra]);

  useEffect(()=>{
    getAvances(idObra, setAvances)
  }, [detalleObra]);

  

  
  
  useEffect(()=>{
    const avancesTemp = [] 
    avances?.map((avance)=>{
      if(avance.tipo === 'real')
        avancesTemp.push(avance)
    })
    setAvancesReales(avancesTemp)
  }, [avances])

  const getProximoAvance = () => {
    return avances.find((avance)=> avance.fecha > fechaActual && avance.tipo === 'proyectado' )
  }

  useEffect(()=> {
    const data = getProximoAvance()
    setProxAvance(data)
  }, [])
  

  const { fecha, porcentaje, onInputChange, onResetForm } = useForm({
    fecha: fechaActual,
    porcentaje: 0
  })

  const avanceRealSubmit = (e) => {
    e.preventDefault();

    if(porcentaje > detalleObra.porc_avance_operativo && porcentaje <= 100) {
      uploadAvanceReal(fechaActual, porcentaje, idObra);
      setDetalleObra((prevState) => ({
        ...prevState,
        porc_avance_operativo: porcentaje
      }));
    } else {
      swal.fire({
        title: "Debe ingresar un avance mayor al anterior",
        icon: "error",
        toast: true,
        timer: 4000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
    })
    }
    onResetForm()
    handleCloseAR()
  }

  const onChangeProyectado = (e, index) => {
    const { name, value } = e.target;
  
    setHitos(prevState => {
      const nuevosHitos = [...prevState];
      nuevosHitos[index] = {
        ...nuevosHitos[index],
        [name]: value
      };
  
      // Creamos una variable para almacenar el mensaje de error
      let errorMessage = '';
  
      // Validamos el campo 'fecha'
      if (name === 'fecha') {
        if(nuevosHitos[index - 1] && nuevosHitos[index - 1].fecha >= value)
          errorMessage = `Ingrese una fecha mayor a ${nuevosHitos[index-1].fecha}`;
        
        if(nuevosHitos[index + 1] && nuevosHitos[index + 1].fecha <= value)
          errorMessage = `Ingrese una fecha menor a ${nuevosHitos[index+1].fecha}`;
      }
  
      // Validamos el campo 'porcentaje'
      if (name === 'porcentaje') {
        if(nuevosHitos[index - 1] && parseInt(nuevosHitos[index - 1].porcentaje) >= value)
          {errorMessage = `Ingrese un porcentaje mayor a ${nuevosHitos[index-1].porcentaje}`;}

        if(nuevosHitos[index + 1] && parseInt(nuevosHitos[index + 1].porcentaje) <= value)
          errorMessage = `Ingrese un porcentaje menor a ${nuevosHitos[index+1].porcentaje}`;

        if(nuevosHitos[numHitos] && parseInt(nuevosHitos[numHitos].porcentaje) !== 100)
          errorMessage = 'Su ultimo porcentaje debe ser igual a 100';
      }
  
      // Actualizamos el estado de errores
      setErrores(prevErrors => {
        const newErrors = [...prevErrors];
        newErrors[index] = {name: name, message: errorMessage}
        return newErrors;
      });
      

      return nuevosHitos;
    });
  };

  const avanceProyecSubmit = (e) => {
    e.preventDefault();

    uploadAvanceProyectado(hitos, idObra);
      
    onResetForm()
    handleCloseAR()
  }

  const renderHitosFields = () => {
    const fields = [];
    for (let i = 1; i <= numHitos; i++) {
      fields.push(
        <div  key={i}>
  
          <Form.Group>
            <Form.Label>{`Fecha hito ${i}`}</Form.Label>
            <Form.Control 
              type="date"
              name={'fecha'}
              placeholder={`Ingrese la fecha del hito ${i}`}
              onChange={ (e) => {
                onChangeProyectado(e, i)
              }}
              required
            />
            {errores[i] && errores[i].name === 'fecha' && <span style={{ color: 'red' }}>{errores[i].message}<br/></span>}
            <Form.Label><br/>{`% Avance esperado hito ${i}`}</Form.Label>
            <Form.Control 
              type="number"
              name={'porcentaje'}
              placeholder={`Ingrese el porcentaje de avance del hito ${i}`}
              onChange={(e) => {
                onChangeProyectado(e, i)
              }}
              required
              max={100}
              min={0}
            />
            {errores[i] && errores[i].name === 'porcentaje' && <span style={{ color: 'red' }}>{errores[i].message}</span>}
          </Form.Group>
          <br/><br/>
        </div>
      );
    }
    return fields;
  };

  const basicFilter = {
  $schema: "http://powerbi.com/product/schema#basic",
  target: {
    table: "avances",
    column: "id_obra_id"
  },
  operator: "In",
  values: [parseInt(idObra)],
  filterType: models.FilterType.BasicFilter,
  requireSingleSelection: true
}



  
  

  return (
    <div className="AvancesContainer">
      <SidebarV2 />
      
      <div className="recuadro-contenido ">
        <div className="titulo">
          <h1>Avance Operativo</h1>
        </div>
        <div className="detalle">
          <div className="dato"><span><strong>Porcentaje de Avance:</strong></span><span> {detalleObra.porc_avance_operativo} %</span></div>
          <div className="dato"><span><strong>Ultimo Avance:</strong></span><span>{avancesReales[avancesReales.length -1]?.fecha}</span></div>
          <div className="dato"><span><strong>Proximo avance esperado:</strong></span><span>{proxAvance?.porcentaje}% al {proxAvance?.fecha} </span></div>
        </div>
        <div className="botonera">
          {
            detalleObra && detalleObra.is_avance ? 
            <>
            <Button variant="danger" onClick={handleShowAP}>Proyectar Nuevo Avance</Button>
              <Modal show={showAP} onHide={handleCloseAP}>
                <Modal.Header closeButton>
                  <Modal.Title>Definir Nuevo Avance Proyectado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={avanceProyecSubmit}>
                    <Form.Group>
                      <Form.Label>Ingrese la cantidad de hitos</Form.Label>
                      <Form.Control 
                        type="number"
                        name="hitos"
                        onChange={(e)=>{
                          setNumHitos(parseInt(e.target.value))
                        }}
                        required
                      />
                    </Form.Group>

                  {renderHitosFields()}
                  
                  <Button variant="danger" type="onSubmit" disabled>
                    Guardar Avance
                  </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </>
            :
            <>
            <Button variant="danger" onClick={handleShowAP}>Proyectar Avance inicial</Button>
              <Modal show={showAP} onHide={handleCloseAP}>
                <Modal.Header closeButton>
                  <Modal.Title>Definir Avance Proyectado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={avanceProyecSubmit}>
                    <Form.Group>
                      <Form.Label>Ingrese la cantidad de hitos</Form.Label>
                      <Form.Control 
                        type="number"
                        name="hitos"
                        onChange={(e)=>{
                          setNumHitos(parseInt(e.target.value))
                        }}
                        required
                      />
                    </Form.Group>

                  {renderHitosFields()}
                  
                  <Button variant="danger" type="onSubmit" disabled={errores.some(e => {
                    if(e)
                      return e.message !== ''
                    })
                  }>
                    Guardar Avance
                  </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </>
          }
          <Button variant="danger" onClick={handleShowAR}>Subir Avance</Button>
            <Modal show={showAR} onHide={handleCloseAR}>
              <Modal.Header closeButton>
                <Modal.Title>Ingrese el Avance</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={avanceRealSubmit}>
                  <Form.Group>
                    <Form.Label>Fecha Actual</Form.Label>
                    <Form.Control 
                      type="date"
                      name="fecha"
                      value={fechaActual}
                      onChange={onInputChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Porcentaje</Form.Label>
                    <Form.Control 
                      type="number"
                      name="porcentaje"
                      placeholder="Ingrese el porcentaje de avance operativo"
                      onChange={onInputChange}
                      required
                    />
                  </Form.Group>
                <Button variant="danger" type="onSubmit" >
                  Guardar Avance
                </Button>
                
                </Form>
              </Modal.Body>
            </Modal>
        </div>
        <div className="curva-s">
          <PowerBIEmbed
            embedConfig = {{
              type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
              id: 'e1b87720-3289-423e-a369-2a7c7cca3630',
              embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=e1b87720-3289-423e-a369-2a7c7cca3630&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwiZGlzYWJsZUFuZ3VsYXJKU0Jvb3RzdHJhcFJlcG9ydEVtYmVkIjp0cnVlfX0%3d',
              accessToken: accessToken.access_token,
              tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
              filters: [basicFilter],
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false
                  }
                },
                background: models.BackgroundType.Transparent,
              }
            }}

            eventHandlers = {
              new Map([
                ['loaded', function () {console.log('Report loaded');}],
                ['rendered', function () {console.log('Report rendered');}],
                ['error', function (event) {console.log(event.detail);}],
                ['visualClicked', () => console.log('visual clicked')],
                ['pageChanged', (event) => console.log(event)],
              ])
            }
            
            cssClassName = { "reportClass" }
            getEmbeddedComponent = { (embeddedReport) => {
              window.report = embeddedReport ;
            }}
          />
        </div>
        <div className="historico">
          <h3>Historial</h3>
          <Table>
            <thead>
              <tr>
                <th>Responsable</th>
                <th>Fecha</th>
                <th>Porcentaje</th>
              </tr>
            </thead>
            <tbody>
            {
              avancesReales?.map((avance)=>
                    <tr key={avance.id}>
                      <td>{avance.responsable} </td>
                      <td>{avance.fecha}</td>
                      <td>{avance.porcentaje} %</td>
                    </tr>
              )
            }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default AvanceOperativo
