import SidebarV2 from "../SidebarV2/SidebarV2";
import Spinner from 'react-bootstrap/Spinner';
import "./Obras.css";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { getObras, getObra } from "../../actions/getPetitions";

const Obras = () => {
  const [obrasData, setObrasData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 2650);
  }

  const { user } = useContext(AuthContext);

  const filterObrasByDirec = (searchTerm) => {
    if (!Array.isArray(obrasData)) {
      return [];
    }
    if (searchTerm.trim() === "") {
      return obrasData;
    } else {
      return obrasData.filter((obra) =>
        obra.direccion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const getDatos = () => {
    try {
      const id = user.user_id
      if (user.rol == 1 || user.rol == 2 || user.rol == 5) {
        getObras(setObrasData)
      } else {
        getObra(id, setObrasData)
      }
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

  useEffect(() => {
    getDatos();
  }, [searchTerm]);

  return (
    <div className="ObrasContainer">
      <SidebarV2 />
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
            <label htmlFor="search">Buscar por ID:</label>
            <input
              className="BuscadorDeObras"
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='spinnerLoading'>
                  { loading ?
                    <Spinner animation="border" variant="danger" className='spinnerLoading' />
                  :
                    <></>
                  }
                </div>
            {user.rol == 1 || user.rol == 2 || user.rol == 5 ?
              <Link className="BotonNuevaObra" to={"/obras/nueva-obra"}>
                <Button variant="danger" onClick={handleClick}>Nueva Obra</Button>
              </Link>
              :
              <></>
            }
          </form>
          <table>
            <thead>
              <tr>
                <th>Nombre de la Obra</th>
                <th>Fecha de inicio</th>
                <th>Direccion</th>
                <th>Tipo de obra</th>
                <th>Estado de la obra</th>
              </tr>
            </thead>
            <tbody>
              {obrasData.length > 0 && filterObrasByDirec(searchTerm).map((obra) => (
                <tr key={obra.id}>
                  <td>{obra.nombre}</td>
                  <td>{obra.fecha_inicio}</td>
                  <td>{obra.direccion}</td>
                  <td>{obra.tipo_obra}</td>
                  <td>{obra.porc_avance_operativo} %</td>
                  <td>
                    <Link to={`/obras/${obra.id}`}>
                      <Button variant="danger" onClick={handleClick}>+</Button>

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
