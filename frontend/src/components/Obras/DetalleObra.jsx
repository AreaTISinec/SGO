import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import "./DetalleObra.css";

const DetalleObra = () => {
  const { idObra } = useParams();
  const [detalleObra, setDetalleObra] = useState();

  const getDatos = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/obras/${idObra}`
    );
    setDetalleObra(data);
    console.log(detalleObra)
  };
 
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    console.log('useEffect del accessToken')
    const fetchAccessToken = async () => {
      try {
        // Realiza una solicitud a tu backend para obtener un nuevo token de acceso
        const response = await fetch('http://127.0.0.1:8000/api/powerbi/getAccessToken/');
        const data = await response.json();
        // Actualiza el estado del token de acceso con el nuevo token
        setAccessToken(data.accessToken);
        
        console.log(accessToken)
      } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
      }
    };
    fetchAccessToken()
    // Refresca el token de acceso cada hora (3600000 milisegundos)
    const intervalId = setInterval(fetchAccessToken, 3600000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // Ejecutar efecto solo en el montaje inicial del componente


  useEffect(() => {
    getDatos();
    console.log('useEffect del getdatos')
  }, []); // Ejecutar efecto solo en el montaje inicial del componente

  console.log(accessToken)

  return (
    <div className="DetalleObraContainer">
      <Sidebar />
      <div className="RecuadroDetalleObra">
        <div className="Titulo">
          <h1>Detalle de la obra</h1>
          <Link className="BotonNuevaObra" to={"./nuevo-documento"}>
            <Button variant="danger">Subir documento</Button>
          </Link>
          <Link className="BotonNuevaObra" to={"./documentos"}> {/*ver la url */}
            <Button variant="danger">Ver documentos</Button>
          </Link>
        </div>
        <div>
        <PowerBIEmbed
          embedConfig = {{
            type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: '5c607318-8d82-49bf-a371-7e0edf855485',
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=5c607318-8d82-49bf-a371-7e0edf855485&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwiZGlzYWJsZUFuZ3VsYXJKU0Jvb3RzdHJhcFJlcG9ydEVtYmVkIjp0cnVlfX0%3d',
            accessToken: accessToken,
            tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
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
        <div className="TablaDetalle">
          {detalleObra && (
            <>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Inicio</th>
                    <th>Termino</th>
                    <th>Asignacion</th>
                    <th>Monto Neto</th> {/*NETO*/}
                    <th>Empresa</th>
                    <th>Direccion</th>
                    <th>Comuna</th>
                    <th>Tpo Obra</th>
                    <th>Est Obra</th>
                    <th>Obs</th>
                    <th>% Avance</th>
                    <th>Monto fact</th>
                    <th>Saldo fact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={detalleObra.id}>
                    <td>{detalleObra.id}</td>
                    <td>{detalleObra.fecha_inicio}</td>
                    <td>{detalleObra.fecha_termino}</td>
                    <td>{detalleObra.fecha_asignacion}</td>
                    <td>{detalleObra.monto_neto}</td>
                    <td>{detalleObra.empresa}</td>
                    <td>{detalleObra.direccion}</td>
                    <td>{detalleObra.comuna}</td>
                    <td>{detalleObra.tipo_obra}</td>
                    <td>{detalleObra.estado_obra}</td>
                    <td>{detalleObra.observaciones}</td>
                    <td>{detalleObra.porc_avance}</td>
                    <td>{detalleObra.monto_facturado}</td>
                    <td>{detalleObra.saldo_facturado}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleObra;

