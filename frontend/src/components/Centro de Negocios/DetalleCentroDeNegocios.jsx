import { useParams } from "react-router-dom";
import SidebarV2 from "../SidebarV2/SidebarV2";
import "./DetalleCentroDeNegocios.css";
import { useState, useEffect } from "react";
import { getCeNe } from "../../actions/getPetitions";

const DetalleCentroDeNegocios = () => {
  const { idCentroDeNegocios } = useParams();
  const [detalleCentroDeNegocios, setDetalleCentroDeNegocios] = useState();

  const getDatos = () => {
    getCeNe(idCentroDeNegocios, setDetalleCentroDeNegocios)
  };

  useEffect(() => {
    getDatos();
  }, []);

  return (
    <div className="DetalleCentroNegociosContainer">
      <SidebarV2 />
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
