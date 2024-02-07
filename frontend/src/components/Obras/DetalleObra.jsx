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
 

  useEffect(() => {
    getDatos();
    console.log('useeeffeccc')
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
        <PowerBIEmbed
          embedConfig = {{
            type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: '5c607318-8d82-49bf-a371-7e0edf855485',
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=5c607318-8d82-49bf-a371-7e0edf855485&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwiZGlzYWJsZUFuZ3VsYXJKU0Jvb3RzdHJhcFJlcG9ydEVtYmVkIjp0cnVlfX0%3d',
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyIsImtpZCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTFhZTMwMTEtNDgwMS00OTBiLWExMDctOWNkOGFiNmQ1ODE3LyIsImlhdCI6MTcwNzMxMjE1MiwibmJmIjoxNzA3MzEyMTUyLCJleHAiOjE3MDczMTcyNjQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJFMlZnWU5nbldhU2QvVHZsZEhkTGFhdHBqcFpnaHZLTWlWem1RWnZOZGdjNlNRYW9QSTExV3NreHIyZURjQ2xuaWNZaWpXZmlBQT09IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiRXNwaW5vemEiLCJnaXZlbl9uYW1lIjoiRGllZ28iLCJpcGFkZHIiOiIxOTAuMTUxLjg4LjIxMCIsIm5hbWUiOiJEaWVnbyBFc3Bpbm96YSIsIm9pZCI6Ijk5YzRhNzc0LWQ5M2ItNDA5My04NWVlLTY1OTUyYzA5NTVlZCIsInB1aWQiOiIxMDAzMjAwMjg5OTk3N0UyIiwicmgiOiIwLkFTWUFFVEN1b1FGSUMwbWhCNXpZcTIxWUZ3a0FBQUFBQUFBQXdBQUFBQUFBQUFBbUFMay4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJWX3l1UXZnRmhfYU9qdGZDRG9GbGpBS3RXMnFpLU9tcjJsZTRzUXFXV3drIiwidGlkIjoiYTFhZTMwMTEtNDgwMS00OTBiLWExMDctOWNkOGFiNmQ1ODE3IiwidW5pcXVlX25hbWUiOiJkZXNwaW5vemFAc2luZWNzYS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJkZXNwaW5vemFAc2luZWNzYS5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJubE9GcDVfbzNVeUNTT3pZV1NkUEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJmMjhhMWY1MC1mNmU3LTQ1NzEtODE4Yi02YTEyZjJhZjZiNmMiLCJmMDIzZmQ4MS1hNjM3LTRiNTYtOTVmZC03OTFhYzAyMjYwMzMiLCIyOTIzMmNkZi05MzIzLTQyZmQtYWRlMi0xZDA5N2FmM2U0ZGUiLCJmZTkzMGJlNy01ZTYyLTQ3ZGItOTFhZi05OGMzYTQ5YTM4YjEiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.Ay73izn3cDHfXefhb_Bsw_TFX9wHrzrBgyyGYqEZaqB0OSmuD2IlXTRu6XnoiqYl6A4oJtp22AQ_TqdV2vjkI9THKRoMXOxKMR9Q_pHpM5AlWg-ejOLQoTuMv7uq5TeDcWpOVvzZ0sZbvzI7hKhKYF6JHyLxhR9DdBlQXTOIuIgHLUxL0GujqnViPaiLw2xwXzX3Tsw9VBAyxqzUFZP0lOTtu5pP8fV6D5gDUBQoW2ECxKzgpii96_2UFJD91DI1-ScNmFcarqi85R0ERzSwKQa1k-R_clwYyW29i_F5vMgQZD4IRguhuW_Ha4Pbk67oin51hW4fRwlftX8WP6WQyA',
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
