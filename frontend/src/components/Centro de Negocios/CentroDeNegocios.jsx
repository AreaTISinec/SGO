import Sidebar from "../Sidebar/Sidebar";
import "./CentroDeNegocios.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CentroDeNegocios = () => {

  const [centronegocioData, setCentronegocioData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  const getDatos = async () => {
    if (searchTerm.trim() === '') {
      // Evitar la solicitud si el término de búsqueda está vacío
      return;
    }
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/obras/${searchTerm}`
      );
      setCentronegocioData(data.results);
    }
    catch(err) {
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getDatos();
          }}
        >
          <label htmlFor="search">Buscar por ID:</label>
          <input
            className="BuscadorDeCentrosNegocios"
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {centronegocioData.map((CentroNegocios) => (
              <tr key={CentroNegocios.id}>
                <td>{CentroNegocios.id}</td>
                <td>{CentroNegocios.fecha_inicio}</td>
                <Link to={`/centro-de-negocios/${CentroNegocios.id}`}>
                  <Button variant="danger">+</Button>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CentroDeNegocios;
