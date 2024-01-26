import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx"
import axios from "axios";

import './Home.css'

const Home = () => {
  const [userData, setUserData] = useState([])

  const getDatos = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/accounts/me/`
      );
      console.log(data);
      setUserData(data);
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

  useEffect(() => {
    getDatos()
  },[])


  return (
    <main className="HomeContainer">
      <Sidebar />
      <div className="RecuadrosHome">
        <div className="RecuadroUno">
          Obras
        </div>
        <div className="RecuadroDos">
          <h2>Resumen</h2>
          <div>
            {}

          </div>

        </div>
        <div className="RecuadroTres">
          Centro de Negocios
        </div>
      </div>
    </main>
  )
}

export default Home