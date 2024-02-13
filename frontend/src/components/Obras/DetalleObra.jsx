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


  return (
    <div className="DetalleObraContainer">
      <Sidebar />
      <div className="RecuadroDetalleObra">
        <div className="Titulo">
          <h1>Detalle de la obra</h1>
          {
            detalleObra && detalleObra.gantt && detalleObra.presupuesto ? 
            <Link className="BotonNuevaObra" to={"./nuevo-documento"}>
              <Button variant="danger">Subir documento</Button>
            </Link>
            :
            <Link className="BotonNuevaObra" to={"./req-documento"}>
              <Button variant="danger">Subir documento</Button>
            </Link>

          }
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
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyIsImtpZCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTFhZTMwMTEtNDgwMS00OTBiLWExMDctOWNkOGFiNmQ1ODE3LyIsImlhdCI6MTcwNzgyNjIwMSwibmJmIjoxNzA3ODI2MjAxLCJleHAiOjE3MDc4MzEwNTksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VkFBQUE0MnJndy81SDVBSFVQOXJRdFBzMzNXVG5pajF0Q2hFSWVxVVJkR3NiY3g2UFU0bmdvK2IrdVNUcUk4VjYxREp3NjI4TUJVd3Nqejk2NEtReGNOYWgxUFBhdUhqa3lVUXlWeVlQMGxQNS9pND0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJFc3Bpbm96YSIsImdpdmVuX25hbWUiOiJEaWVnbyIsImlwYWRkciI6IjE5MC4xNTEuODguMjEwIiwibmFtZSI6IkRpZWdvIEVzcGlub3phIiwib2lkIjoiOTljNGE3NzQtZDkzYi00MDkzLTg1ZWUtNjU5NTJjMDk1NWVkIiwicHVpZCI6IjEwMDMyMDAyODk5OTc3RTIiLCJyaCI6IjAuQVNZQUVUQ3VvUUZJQzBtaEI1ellxMjFZRndrQUFBQUFBQUFBd0FBQUFBQUFBQUFtQUxrLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IlZfeXVRdmdGaF9hT2p0ZkNEb0ZsakFLdFcycWktT21yMmxlNHNRcVdXd2siLCJ0aWQiOiJhMWFlMzAxMS00ODAxLTQ5MGItYTEwNy05Y2Q4YWI2ZDU4MTciLCJ1bmlxdWVfbmFtZSI6ImRlc3Bpbm96YUBzaW5lY3NhLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6ImRlc3Bpbm96YUBzaW5lY3NhLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6Ii1GNUcyZFVzNjB5LTg1WEhoWWQtQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImYyOGExZjUwLWY2ZTctNDU3MS04MThiLTZhMTJmMmFmNmI2YyIsImYwMjNmZDgxLWE2MzctNGI1Ni05NWZkLTc5MWFjMDIyNjAzMyIsIjI5MjMyY2RmLTkzMjMtNDJmZC1hZGUyLTFkMDk3YWYzZTRkZSIsImZlOTMwYmU3LTVlNjItNDdkYi05MWFmLTk4YzNhNDlhMzhiMSIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.PgiNgLsaDZO2_3Ce1vNUlq8eIaTOPlLGspZQvNTSSPoRHTmEwn4CIlhfpndZEu9VO6hCnEMPRXilFE3HFZTowbskvJSqw7LTGcNv_w4JQFK3irhwqZXGHA-yQZ01xFjFPzw9nECuLExu1udXM8okAltPwvSEOviZ7lGkrJE_xcbr7Z2redAeIM9swTZ9Gdc1HPuJJmnvYliZVExNAeKwGWc2TWaFEGAijJ92KHG2JSPBqZXcaR-MJ6lA39gkdPFc6wcvjz8H-AkdJhA_CK243e5tixL0D6f0Bk3DT4lFC7w9QL1Zj1P7_DWAMxEWl0xZRIrpFeXGzom1np0EstuCRw',
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

