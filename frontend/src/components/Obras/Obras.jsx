import Sidebar from "../Sidebar/Sidebar";
import "./Obras.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Obras = () => {
  const [obrasData, setObrasData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const { user } = useContext(AuthContext);

  const filterObrasByDirec = (searchTerm) => {
    if (searchTerm.trim() === "") {
      return obrasData;
    } else {
      return obrasData.filter((obra) =>
        obra.direccion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const getDatos = async () => {
    //if (searchTerm.trim() === "") {return;}
    try {
      if (user.rol == 1 || user.rol == 2 || user.rol == 5) {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/obras/`);
        setObrasData(data);
      } else {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/obras/${user.user_id}`
        );
        setObrasData(data);
      }
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

  useEffect(() => {
    //Con este hook la búsqueda se hace en tiempo real
    getDatos();
  }, []);

  return (
    <div className="ObrasContainer">
      <Sidebar />
      <div className="RecuadroListadoObras">
        <div className="Titulo">
          <h5>Tabla de Obras {obrasData.length}</h5>
        </div>
        <div>
          <form
            className="FormularioObra"
            onSubmit={(e) => {
              e.preventDefault();
              getDatos();
            }}
          >
            <label htmlFor="search">Buscar por nombre:</label>
            <input
              className="BuscadorDeObras"
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link className="BotonNuevaObra" to={"/obras/nueva-obra"}>
              <Button variant="danger">Nueva Obra</Button>
            </Link>
          </form>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha de inicio</th>
                <th>Direccion</th>
                <th>Tipo de obra</th>
                <th>Estado de la obra</th>
              </tr>
            </thead>
            <tbody>
              {filterObrasByDirec(searchTerm).map((obra) => (
                <tr key={obra.id}>
                  <td>{obra.id}</td>
                  <td>{obra.fecha_inicio}</td>
                  <td>{obra.direccion}</td>
                  <td>{obra.tipo_obra}</td>
                  <td>{obra.estado_obra}</td>
                  <td>
                    <Link to={`/obras/${obra.id}`}>
                      <Button variant="danger">+</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Obras;
