/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "react-bootstrap/Accordion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  getClientes,
  getEmpresas,
  getEstadosObra,
  getObras,
  getTiposObra,
} from "../../actions/getPetitions";

const FilterObra = ({ onFilter }) => {
  const [tiposObras, setTiposObras] = useState([]);
  const [estadoObras, setEstadosObras] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [clientes, setClientes] = useState([]);
	const [obras, setObras] = useState([])

  const [showFilter, setShowFilter] = useState(false);

	const [filtros, setFiltros] = useState({
		tipo_obra: {},
		estado_obra: {},
		empresa: {},
		cliente: {}
	})

	const [dataFiltrada, setDataFiltrada] = useState([])

  useEffect(() => {
		getObras(setObras)
    getTiposObra(setTiposObras);
    getEstadosObra(setEstadosObras);
    getEmpresas(setEmpresas);
    getClientes(setClientes);
  }, []);

  const handleShowFilter = () => setShowFilter(!showFilter);

	const handleOnCheck = (e, campo) => {
		// let resultadoFiltro = []
		let newDataFiltrada = [...dataFiltrada]

		switch(campo){
			case 'tipo_obra':
				setFiltros({
					...filtros,
					tipo_obra: {
						...filtros.tipo_obra,
						[e.target.value]: e.target.checked
					}
				})

				if(e.target.checked){
					newDataFiltrada = [...newDataFiltrada, ...obras.filter(item => item.tipo_obra === e.target.value)]
				}else{
					newDataFiltrada = newDataFiltrada.filter(item => item.tipo_obra !== e.target.value)
				}
				break;


			case 'estado_obra':
				setFiltros({
					...filtros,
					estado_obra: {
						...filtros.estado_obra,
						[e.target.value]: e.target.checked
					}
				})

				if(e.target.checked){
					newDataFiltrada = [...newDataFiltrada, ...obras.filter(item => item.estado_obra === e.target.value)]
				}else{
					newDataFiltrada = newDataFiltrada.filter(item => item.estado_obra !== e.target.value)
				}
				break;


			case 'empresa':
				setFiltros({
					...filtros,
					empresa: {
						...filtros.empresa,
						[e.target.value]: e.target.checked
					}
				})
				
				if(e.target.checked){
					newDataFiltrada= [...newDataFiltrada, ...obras.filter(item => item.empresa === e.target.value)]
				}else{
					newDataFiltrada = newDataFiltrada.filter(item => item.empresa !== e.target.value)
				}
				break;


			case 'cliente':
				setFiltros({
					...filtros,
					cliente: {
						...filtros.cliente,
						[e.target.value]: e.target.checked
					}
				})
				
				if(e.target.checked){
					newDataFiltrada = [...newDataFiltrada, ...obras.filter(item => item.cliente === e.target.value)]
				}else{
					newDataFiltrada = newDataFiltrada.filter(item => item.cliente !== e.target.value)
				}
				break;
		}

		setDataFiltrada(newDataFiltrada)
		
		onFilter(newDataFiltrada.length > 0 ? newDataFiltrada : obras)

	}
	console.log('data (filtro):', obras)
	console.log('data filtrada (filtro):', dataFiltrada)
	console.log('filtros (filtro):', filtros)

  return (
    <div>
      <Dropdown className="d-inline mx-2" autoClose="outside">
        <Dropdown.Toggle variant="outlined-secondary">
          <FontAwesomeIcon icon={faFilter} onClick={handleShowFilter} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Tipos de obras</Accordion.Header>
              <Accordion.Body>
                {tiposObras?.map((tipo) => (
                  <div key={tipo.id}>
                    <input
											
											onChange={(e) => handleOnCheck(e, 'tipo_obra')}
                      type="checkbox"
                      name={tipo.nombre}
                      value={tipo.nombre}
                      id={tipo.nombre}
                    />
                    <label htmlFor={tipo.nombre}>{tipo.nombre}</label>
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Estado de Obras</Accordion.Header>
              <Accordion.Body>
                {estadoObras?.map((estado) => (
                  <div key={estado.id}>
                    <input
											
											onChange={ e => handleOnCheck(e, 'estado_obra')}
                      type="checkbox"
                      name={estado.estado}
                      value={estado.estado}
                      id={estado.estado}
                    />
                    <label htmlFor={estado.estado}>{estado.estado}</label>
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Empresas</Accordion.Header>
              <Accordion.Body>
                {empresas?.map((empresa) => (
                  <div key={empresa.id}>
                    <input
											
											onChange={ e => handleOnCheck(e, 'empresa')}
                      type="checkbox"
                      name={empresa.nombre}
                      value={empresa.nombre}
                      id={empresa.nombre}
                    />
                    <label htmlFor={empresa.nombre}>{empresa.nombre}</label>
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Clientes</Accordion.Header>
              <Accordion.Body>
								{clientes?.map((cliente) => (
                  <div key={cliente.rut}>
                    <input
											onChange={e => handleOnCheck(e, 'cliente')}
                      type="checkbox"
                      name={cliente.nombre}
                      value={cliente.nombre}
                      id={cliente.nombre}
                    />
                    <label htmlFor={cliente.nombre}>{cliente.nombre}</label>
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default FilterObra;
