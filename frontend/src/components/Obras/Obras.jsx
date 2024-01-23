import Sidebar from "../Sidebar/Sidebar";
import "./Obras.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ejemplo from '../../../data.json'
import Button from 'react-bootstrap/Button';
import { Link, Navigate } from "react-router-dom";

const Obras = () => {
  const [obrasData, setObrasData] = useState([]);
  const id = 13

  const getDatos = async () => {
    const {data} = await axios.get(`http://127.0.0.1:8000/api/obras/${id}`)
    //const {data} = ejemplo
   
    setObrasData(data.results)
  }

  useEffect(() => {

    getDatos()
  }, []);

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
