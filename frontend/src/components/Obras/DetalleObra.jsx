import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
// import { PowerBIEmbed } from 'powerbi-client-react';
// import models from 'powerbi-client';
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
 

  useEffect(() => {
    getDatos();
  }, []); // Ejecutar efecto solo en el montaje inicial del componente


  return (
    <div className="DetalleObraContainer">
      <Sidebar />
      <div className="RecuadroDetalleObra">
        <div className="Titulo">
          <h1>Detalle de la obra</h1>
          <Link className="BotonNuevaObra" to={"./nuevo-documento"}>
            <Button variant="danger">Subir documento</Button>
          </Link>
        </div>
        <div>
          {/* <PowerBIEmbed
            embedConfig = {{
              type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
              id: 'b3687150-71b5-423d-8530-2377bce7ec67',
              embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=b3687150-71b5-423d-8530-2377bce7ec67&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlLCJkaXNhYmxlQW5ndWxhckpTQm9vdHN0cmFwUmVwb3J0RW1iZWQiOnRydWV9fQ%3d%3d',
              accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyIsImtpZCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYmEyNTdjMzQtMDdkOS00NjAxLWIwODQtODY1Y2QzZjJlMzYyLyIsImlhdCI6MTcwNzIyNTE1OCwibmJmIjoxNzA3MjI1MTU4LCJleHAiOjE3MDcyMzAxNDcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VkFBQUFKOW5OcWF3Z1ZmUVBGUzIvVlgvZVcyOGcxYUU0UGhVRVhRaVEzazFaM2xHSTZheVBWWVV0TFc4WDl2a09sYlFyIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiRFJPR1VFVFQgR0FSQVRFIiwiZ2l2ZW5fbmFtZSI6IkxVQ0FTIEJFTkpBTUlOIiwiaXBhZGRyIjoiMTkwLjE1MS44OC4yMTAiLCJuYW1lIjoiTFVDQVMgQkVOSkFNSU4gRFJPR1VFVFQgR0FSQVRFIiwib2lkIjoiNTQ0MzYzOTktODQzZi00OWIwLWE0NjMtZTQ1M2YyYjRmYjBlIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIwNzMyMjUyNDYtNDg3MjY1MDY5LTE3NDMzMzEzNzktMTgyODAiLCJwdWlkIjoiMTAwMzIwMDBBOTFBN0IwNyIsInJoIjoiMC5BU1VBTkh3bHV0a0hBVWF3aElaYzBfTGpZZ2tBQUFBQUFBQUF3QUFBQUFBQUFBQWxBQ1UuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiYnY3WjJFYXhqNHpQQl9YM0N6NTl0cWRiRFVYdHhZcThRU0phZ0lvcndhQSIsInRpZCI6ImJhMjU3YzM0LTA3ZDktNDYwMS1iMDg0LTg2NWNkM2YyZTM2MiIsInVuaXF1ZV9uYW1lIjoibGRyb2d1ZXR0QHV0ZW0uY2wiLCJ1cG4iOiJsZHJvZ3VldHRAdXRlbS5jbCIsInV0aSI6Ind1RjUzc2VPalVlSmhhbkkxUUVsQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.P0MV8RJbvlPqgbY6WPZXspYJw4Gi_9OilcTj0nIiQpE9qalA8yIWcHCnbd0WSOGdrAVW68GpUwSuc_0fD5A0i9g6-tZX3REqFnQPCXTDDEfCp8CCcuFd40HQhOW7GwuoT_i7iry5vetTEwGxE5Al3blIYr9iHmGvxjh_VechT2WEx1gTW1eL2coJboC7eZdzsUahywGdXtQV8seygsvI-gO-vx-e8_ZuaZUpPO2BWVxCH-veBU9nkDo29LC0m9DiEaS9Z4WZ7pmaQQI9ia24IE1OiSrA_f2vJtzt4yZVe6wJBfx7XoaukvL93DU7pyWZYp60Ce7LP8Ll4dLEzMxwCw',
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
              window.report = embeddedReport;
            }}
          /> */}
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
