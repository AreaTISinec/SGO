import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./DetalleCentroDeNegocios.css";
import axios from "axios";
import { useState, useEffect } from "react";

const DetalleCentroDeNegocios = () => {
  const { idCentroDeNegocios } = useParams();
  const [detalleCentroDeNegocios, setDetalleCentroDeNegocios] = useState();

  const getDatos = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/cene/${idCentroDeNegocios}`
    );
    console.log(data)
    setDetalleCentroDeNegocios(data);
  };

  useEffect(() => {
    getDatos();
  }, []);

  return (
    <div className="DetalleCentroNegociosContainer">
      <Sidebar />
      <div className="RecuadroDetalleCentroNegocios">
        <div className="Titulo">
          <h1>Detalle del Centro de Negocios</h1>
        </div>
        <div>
          {detalleCentroDeNegocios && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                  <tr key={detalleCentroDeNegocios.id_cene}>
                    <td>{detalleCentroDeNegocios.id_cene}</td>
                    <td>{detalleCentroDeNegocios.nombre}</td>
                  </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleCentroDeNegocios;
