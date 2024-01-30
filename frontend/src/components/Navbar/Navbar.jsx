import Navbar from "react-bootstrap/Navbar";
import logogrupo from "../../img/logogrupo.png";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Navbar.css"
import dayjs from "dayjs";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext)

  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary p-0 m-0">
          <nav className="navbar">
            <div className="navbar__top">
              <div className="navbar__top__logo">
                <Navbar.Brand href="http://localhost:5173/home">
                  <img
                    src={logogrupo}
                    alt="logo"
                    className="d-inline-block allign-top"
                  />
                </Navbar.Brand>
              </div>
              {
                !isExpired ? 
                  (
                    <div className="navbar__top__auth">
                      <span>Hola, {user.username}</span>
                      <button className="BotonCerrarSesion" onClick={logoutUser}>Cerrar Sesion</button>
                    </div>
                  ):(
                    <></>
                  )
                
              }
            </div>
            
          </nav>
      </Navbar>
    </>
  );
};



export default NavBar;
