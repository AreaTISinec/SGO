/* eslint-disable react-hooks/exhaustive-deps */
import Sidebar from "../Sidebar/Sidebar";
import "./CentroDeNegocios.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CentroDeNegocios = () => {
  const [centronegocioData, setCentronegocioData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const getDatos = async () => {
<<<<<<< HEAD
    if (searchTerm.trim() === "") {
      return centronegocioData;
    }
=======
>>>>>>> d29f4e06b452d9ea807d1df69130edc05400be31
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/cene/search/?search=${searchTerm}`
      );
      setCentronegocioData(data);
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

  useEffect(() => {
    getDatos();
  }, [searchTerm]);

  return (
    <div className="CentroNegociosContainer">
      <Sidebar />
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
            <Link
              className="BotonNuevoCDN"
              to={"/centro-de-negocios/nuevo-centro-de-negocios"}
            >
              <Button variant="danger">Nuevo Centro</Button>
            </Link>
          </form>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {centronegocioData?.map((CentrodeNegocios) => (
                    <tr key={CentrodeNegocios.id_cene}>
                      <td>{CentrodeNegocios.id_cene}</td>
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
