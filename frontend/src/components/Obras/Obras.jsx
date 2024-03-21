import SidebarV2 from "../SidebarV2/SidebarV2";
import Spinner from 'react-bootstrap/Spinner';
import "./Obras.css";
import { useState, useEffect, useContext } from "react";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { getObras, getObra } from "../../actions/getPetitions";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import FilterObra from "../Filter/FilterObra";



const Obras = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const [loading, setLoading] = useState(false)

  const [ordenAsc, setOrdenAsc] = useState(false)
  const [campoOrden, setCampoOrden] = useState('')

  const [filteredData, setFilteredData] = useState([])

  const handleFilter = (data) => setFilteredData(data)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 2650);
  }


  const { user } = useContext(AuthContext);

  const filterObrasByDirec = (searchTerm) => {
    if (!Array.isArray(filteredData)) {
      return [];
    }
    if (searchTerm.trim() === "") {
      return filteredData;
    } else {
      return filteredData.filter((obra) =>
        obra.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const getDatos = () => {
    try {
      const id = user.user_id
      if (user.rol == 1 || user.rol == 2 || user.rol == 5) {
        getObras(setFilteredData)
      } else {
        getObra(id, setFilteredData)
      }
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

  useEffect(() => {
    getDatos();
  }, [searchTerm]);

  const sortTable = (campo) => {
    let sortedData;
    switch(campo){
      case 'nombre':
        sortedData = [...filteredData].sort((a,b)=> {
            let x = a.nombre.toLowerCase()
            let y = b.nombre.toLowerCase()
            if(x < y) return -1
            if(x > y) return 1
            return 0
        })
        break;
      case 'fecha_inicio':
        sortedData = [...filteredData].sort((a,b)=> new Date(a.fecha_inicio) > new Date(b.fecha_inicio) )
        break;
      case 'direccion':
        sortedData = [...filteredData].sort((a,b)=> {
          let x = a.direccion.toLowerCase()
          let y = b.direccion.toLowerCase()
          if(x < y) return -1
          if(x > y) return 1
          return 0
      })
        break;
      case 'tipo_obra':
        sortedData = [...filteredData].sort((a,b)=> {
          let x = a.tipo_obra.toLowerCase()
          let y = b.tipo_obra.toLowerCase()
          if(x < y) return -1
          if(x > y) return 1
          return 0
      })
        break;
      case 'avance_operativo':
        sortedData = [...filteredData].sort((a,b)=> {
          if(a.porc_avance_operativo < b.porc_avance_operativo)
            return -1;
          if(a.porc_avance_operativo > b.porc_avance_operativo)
            return 1;
          return 0;
      })
        break;
    }

    if(campo === campoOrden && ordenAsc){
      sortedData.reverse()
      setOrdenAsc(false)
    }else{
      setOrdenAsc(true)
    }

    setCampoOrden(campo);
    setFilteredData(sortedData);
  }



  return (
    <div className="ObrasContainer">
      <SidebarV2 />
      <div className="RecuadroListadoObras">
        <div className="Titulo">
          <h5>Tabla de Obras {filteredData.length}</h5>
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
                <th>
                  Nombre de la Obra 
                  <button className="icon-button" onClick={() => sortTable('nombre')}> 
                    <FontAwesomeIcon icon={faSort} />
                  </button> 
                </th>
                <th>
                  Fecha de inicio 
                  <button className="icon-button" onClick={() => sortTable('fecha_inicio')}>
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>
                <th>
                  Direccion
                  <button className="icon-button" onClick={() => sortTable('direccion')}>
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>
                <th>
                  Tipo de obra
                  <button className="icon-button" onClick={() => sortTable('tipo_obra')}>
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>
                <th>
                  % Avance operativo
                  <button className="icon-button" onClick={() => sortTable('avance_operativo')}>
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>
                <th>
                  <FilterObra onFilter={handleFilter}/>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 && filterObrasByDirec(searchTerm).map((obra) => (
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
