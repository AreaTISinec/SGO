import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Button from "react-bootstrap/esm/Button.js";

import "./NuevoCentroDeNegocios.css";

const NuevoCentroDeNegocios = () => {
  return (
    <div className="NuevoCentroDeNegociosContainer">
      <Sidebar />
      <div className="RecuadroNuevoCentroDeNegocios">
        <form className="FormularioNuevoCentroDeNegocios">
          <label htmlFor="id">Ingresa el ID:</label>
          <input
            className="BuscadorNuevoCentrosNegocios"
            type="text"
            id="id"
            name="id"
            // value={id}
            // onChange={(e) => setId(e.target.value)}
            // required
          />
          <label htmlFor="nombre">Nombre:</label>
          <input
            className="BuscadorNuevoCentrosNegocios"
            type="text"
            id="nombre"
            name="nombre"
            // value={nombre}
            // onChange={(e) => setNombre(e.target.value)}
            // required
          />
          <Button className="BotonCrearCentroDeNegocio" variant="danger">Crear Centro de Negocios</Button>
        </form>
      </div>
    </div>
  );
};

export default NuevoCentroDeNegocios;

/*

const Formulario = () => {
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
  
    const guardarDatos = () => {
      // Aquí puedes realizar alguna lógica adicional antes de enviar los datos al servidor
      console.log('ID:', id);
      console.log('Nombre:', nombre);
  
      // Envía los datos al servidor utilizando fetch o axios
      fetch('/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, nombre }),
      })
        .then(response => response.json())
        .then(data => {
          // Maneja la respuesta del servidor (puedes mostrar un mensaje de éxito, por ejemplo)
          console.log(data);
        })
        .catch(error => {
          console.error('Error al enviar los datos:', error);
        });
    };
  return (
    <form className="Formulario">
      <label htmlFor="id">ID:</label>
      <input
        type="text"
        id="id"
        name="id"
        value={id}
        onChange={e => setId(e.target.value)}
        required
      />

      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
      />

      <button type="button" onClick={guardarDatos}>
        Guardar
      </button>
    </form>
  );
};
    
  
  export default Formulario;

*/
