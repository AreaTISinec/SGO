import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./DetalleObra.css";
import axios from "axios";
import { useState, useEffect } from "react";
import UploadFile from "../../containers/UploadFile/UploadFile";

const DetalleObra = () => {
  const { idObra } = useParams();
  const [detalleObra, setDetalleObra] = useState();

  const getDatos = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/obras/${idObra}`
    );
    setDetalleObra(data);
  };

  useEffect(() => {
    getDatos();
  }, []);

  //REVISAR LAS CLASES QUE NO ESTÁN EN EL CSS
  return (
    <div className="DetalleObraContainer">
      <Sidebar />
      <div className="RecuadroDetalleObra">
        <div className="Titulo">
          <h1>Detalle de la obra</h1>
        </div>
        <div className="ContenedorGraficos">graficos</div>
        <div className="TablaDetalle">
          {detalleObra && (<>

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
            <UploadFile id={idObra}/>
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleObra;
