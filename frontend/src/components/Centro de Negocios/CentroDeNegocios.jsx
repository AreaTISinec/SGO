/* eslint-disable react-hooks/exhaustive-deps */
import SidebarV2 from "../SidebarV2/SidebarV2";
import "./CentroDeNegocios.css";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { getCeNes, getCeNe } from "../../actions/getPetitions";

const CentroDeNegocios = () => {
  const [centronegocioData, setCentronegocioData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const { user } = useContext(AuthContext)

  const getDatos = () => {
    try {
      if (searchTerm.trim() === "") {
        getCeNes(setCentronegocioData)
      }else{
        getCeNe(searchTerm, setCentronegocioData)
      }
      
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

  useEffect(() => {
    getDatos();
  }, [searchTerm]);

  return (
    <div className="CentroNegociosContainer">
      <SidebarV2 />
      <div className="RecuadroCentroNegocios">
        <div className="Titulo">
          <h5>Tabla Centro de Negocios</h5>
        </div>
        <div>
          <form
            className="FormularioCDN"
            onSubmit={(e) => {
              e.preventDefault();
              getDatos();
            }}
          >
            <label htmlFor="search">Buscar por nombre:</label>
            <input
              className="BuscadorDeCentrosNegocios"
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            { user.rol == 1 || user.rol == 2 || user.rol == 5 ?
                <Link className="BotonNuevoCDN" to={"/centro-de-negocios/nuevo-centro-de-negocios"}>
                  <Button variant="danger">Nuevo Centro</Button>
                </Link>
                :
                <></>
            }
          </form>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Empresa</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {centronegocioData?.map((CentrodeNegocios) => (
                    <tr key={CentrodeNegocios.id_cene}>
                      <td>{CentrodeNegocios.id_cene}</td>
                      <td>{CentrodeNegocios.empresa}</td>
                      <td>{CentrodeNegocios.nombre}</td>
                      <Link
                        to={`/centro-de-negocios/${CentrodeNegocios.id_cene}`}
                      >
                        <Button variant="danger">+</Button>
                      </Link>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CentroDeNegocios;
