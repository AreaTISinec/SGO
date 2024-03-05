import Navbar from "react-bootstrap/Navbar";
import logogrupo from "../../img/logogrupo.png";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Navbar.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const isExpired = user && dayjs.unix(user.exp).diff(dayjs()) < 1;

  const navigate = useNavigate()

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary p-0 m-0">
        <nav className="navbar">
          <div className="navbar__top">
            <div className="navbar__top__logo">
              <Navbar.Brand href="https://sgo-django.azurewebsites.net/home">
                <img
                  src={logogrupo}
                  alt="logo"
                  className="d-inline-block allign-top"
                />
              </Navbar.Brand>
            </div>
            {!isExpired && user ? (
              <div className="navbar__top__auth">
                <span>Hola, {user && user.username}</span>
                <nav>
                  <button className="BotonCerrarSesion" onClick={ () => logoutUser(user.user_id)}>
                    Cerrar Sesion
                  </button>
                  <button className="BotonHaciaPerfil" onClick={() => navigate(`/perfil/${user.user_id}`)}>
                    Perfil
                  </button>
                </nav>
              </div>
            ) : (
              <></>
            )}
          </div>
        </nav>
      </Navbar>
    </>
  );
};

export default NavBar;
