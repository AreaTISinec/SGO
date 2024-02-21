import { useParams } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar"
import './Perfil.css'
import axios from "axios"

const Perfil = () => {
  const { idUsuario } = useParams()

  const [infoUser, setInfoUser] = useState('')

  const getDatos = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/perfil/${idUsuario}`
    );
    setInfoUser(data);
    console.log('INFORMACION DEL USUARIO')
    console.log(infoUser.id)
  };

  return (
    <div className="PerfilContainer">
      <Sidebar/>
      <div className="RecuadroPerfil">
        <div className="Titulo">
          <h1>Perfil de {infoUser.id}</h1>
        </div>
      </div>
    </div>
  )
}

export default Perfil
  