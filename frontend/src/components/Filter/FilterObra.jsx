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
  getTiposObra,
} from "../../actions/getPetitions";

const FilterObra = ({ data }) => {
  const [tiposObras, setTiposObras] = useState([]);
  const [estadoObras, setEstadosObras] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [showFilter, setShowFilter] = useState(false);

	const [filtros, setFiltros] = useState({
		tipo_obra: {},
		estado_obra: {},
		empresa: {},
		cliente: {}
	})

	const [dataFiltrada, setDataFiltrada] = useState([])

  useEffect(() => {
    getTiposObra(setTiposObras);
    getEstadosObra(setEstadosObras);
    getEmpresas(setEmpresas);
    getClientes(setClientes);
  }, []);

  const handleShowFilter = () => setShowFilter(!showFilter);

	const handleOnCheck = (e, campo) => {
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
					const resultadoFiltro = data.filter(item => item.tipo_obra === e.target.value)
					setDataFiltrada([...dataFiltrada, ...resultadoFiltro])
				}else{
					const resultadoFiltro = dataFiltrada.filter(item => item.tipo_obra !== e.target.value)
					setDataFiltrada([...resultadoFiltro])
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
					const resultadoFiltro = data.filter(item => item.tipo_obra === e.target.value)
					setDataFiltrada([...dataFiltrada, ...resultadoFiltro])
				}else{
					const resultadoFiltro = dataFiltrada.filter(item => item.tipo_obra !== e.target.value)
					setDataFiltrada([...resultadoFiltro])
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
					const resultadoFiltro = data.filter(item => item.empresa === e.target.value)
					setDataFiltrada([...dataFiltrada, ...resultadoFiltro])
				}else{
					const resultadoFiltro = dataFiltrada.filter(item => item.empresa !== e.target.value)
					setDataFiltrada([...resultadoFiltro])
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
					const resultadoFiltro = data.filter(item => item.cliente === e.target.value)
					setDataFiltrada([...dataFiltrada, ...resultadoFiltro])
				}else{
					const resultadoFiltro = dataFiltrada.filter(item => item.cliente !== e.target.value)
					setDataFiltrada([...resultadoFiltro])
				}
				break;
		}
		onFilter(dataFiltrada)
	}
	console.log('data :', data)
	console.log('data filtrada:', dataFiltrada)

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
                  <>
                    <input
											onChange={(e) => handleOnCheck(e, 'tipo_obra')}
                      type="checkbox"
                      name={tipo.nombre}
                      value={tipo.nombre}
                      id={tipo.nombre}
                    />
                    <label htmlFor={tipo.nombre}>{tipo.nombre}</label>
                  </>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Estado de Obras</Accordion.Header>
              <Accordion.Body>
                {estadoObras?.map((estado) => (
                  <>
                    <input
											onChange={ e => handleOnCheck(e, 'estado_obra')}
                      type="checkbox"
                      name={estado.estado}
                      value={estado.estado}
                      id={estado.estado}
                    />
                    <label htmlFor={estado.estado}>{estado.estado}</label>
                  </>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Empresas</Accordion.Header>
              <Accordion.Body>
                {empresas?.map((empresa) => (
                  <>
                    <input
											onChange={ e => handleOnCheck(e, 'empresa')}
                      type="checkbox"
                      name={empresa.nombre}
                      value={empresa.nombre}
                      id={empresa.nombre}
                    />
                    <label htmlFor={empresa.nombre}>{empresa.nombre}</label>
                  </>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Clientes</Accordion.Header>
              <Accordion.Body>
								{clientes?.map((cliente) => (
                  <>
                    <input
											onChange={e => handleOnCheck(e, 'cliente')}
                      type="checkbox"
                      name={cliente.nombre}
                      value={cliente.nombre}
                      id={cliente.nombre}
                    />
                    <label htmlFor={cliente.nombre}>{cliente.nombre}</label>
                  </>
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
