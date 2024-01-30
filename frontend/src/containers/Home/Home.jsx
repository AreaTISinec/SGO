
import Sidebar from "../../components/Sidebar/Sidebar.jsx"

import './Home.css'

const Home = () => {


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