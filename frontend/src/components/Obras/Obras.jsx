import Sidebar from "../Sidebar/Sidebar";
import "./Obras.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link,  } from "react-router-dom";

const Obras = () => {
// const [obrasData, setObrasData] = useState([]);
  // const id = 13

  // const getDatos = async () => {
  //   const {data} = await axios.get(`http://127.0.0.1:8000/api/obras/${id}`)
  //   //const {data} = ejemplo

  //   setObrasData(data.results)
  // }

  const [obrasData, setObrasData] = useState([]);
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
      setObrasData(data.results);
    }
    catch(err) {
      console.error("Error al obtener datos:", err);
    }
  };

  useEffect(() => {
    getDatos();
  }, [searchTerm]);

  return (
    <div className="ObrasContainer">
      <Sidebar />
      <div className="RecuadroListadoObras">
        <form
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
            {obrasData.map((obra) => (
              <tr key={obra.id}>
                <td>{obra.id}</td>
                <td>{obra.fecha_inicio}</td>
                <td>{obra.direccion}</td>
                <td>{obra.tipo_obra}</td>
                <td>{obra.estado_obra}</td>
                <Link to={`/obras/${obra.id}`}>
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

export default Obras;

/*
import React, { useState, useEffect } from 'react';

const Obras = () => {
  const [obrasData, setObrasData] = useState([]);

  useEffect(() => {
    // Lógica para obtener datos de la base de datos y actualizar el estado
    // Puedes usar fetch, axios u otra biblioteca para realizar la solicitud.
    // Actualiza setObrasData con los datos recuperados.
  }, []);

  return (
    <div className="ObrasContainer">
      <Sidebar />
      <div className="RecuadroListadoObras">
        Renderizar la tabla de obras aquí *
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              Agrega más encabezados según tus datos
            </tr>
          </thead>
          <tbody>
            Mapea los datos y crea filas de la tabla 
            {obrasData.map((obra) => (
              <tr key={obra.id}>
                <td>{obra.id}</td>
                <td>{obra.nombre}</td>
                Agrega más celdas según tus datos
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Obras;
*/

/*
  <div className="RecuadroContainer">
          <div className="RecuadroListadoObras">Obras</div>
        </div>
  */
