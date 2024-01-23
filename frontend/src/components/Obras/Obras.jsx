import Sidebar from "../Sidebar/Sidebar";
import "./Obras.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ejemplo from '../../../data.json'
import Button from 'react-bootstrap/Button';

const Obras = () => {
  const [obrasData, setObrasData] = useState([]);

  const getDatos = async () => {
    // const {data} = await axios.get("http://127.0.0.1:8000/api/obras/")
    const {data} = ejemplo
    console.log(data)
    setObrasData(data)
  }

  useEffect(() => {
    // Lógica para obtener datos de la base de datos y actualizar el estado
    // Puedes usar fetch, axios u otra biblioteca para realizar la solicitud.
    // Actualiza setObrasData con los datos recuperados.
    getDatos()
  }, []);

  //Funciones de boton
  const [detalle, setDetalle] = useState(false);

  const verMas = () => {
    setDetalle(!detalle);
  };

  return (
    <div className="ObrasContainer">
      <Sidebar />
      <div className="RecuadroListadoObras">
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
                <td>{obra.fechaInicio}</td>
                <td>{obra.direccion}</td>
                <td>{obra.tipoObra}</td>
                <td>{obra.estado}</td>
                <Button onClick={verMas} variant="danger">+</Button>
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
