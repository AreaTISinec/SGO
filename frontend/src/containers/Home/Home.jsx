import { useContext, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import AuthContext from "../../context/AuthContext"
import axios from "axios";
import "./Home.css";

const Home =  () => {
  const { user } = useContext(AuthContext);
  console.log(user.user_id)
  const getUser = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const body = JSON.stringify({'is_connected': true})
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/accounts/logout/${user.user_id}/`, body, config)
  
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    getUser()
  },[])
  return (
    <main className="HomeContainer">
      <Sidebar />
      <div className="RecuadrosHome">
        <div className="RecuadroUno">Obras</div>
        <div className="RecuadroDos">Resumen</div>
        <div className="RecuadroTres">Centro de Negocios</div>
      </div>
    </main>
  );
};

export default Home;
