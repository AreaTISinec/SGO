import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import "./Navbar.css";
import logogrupo from "../../img/logogrupo.png";

const NavBar = () => {
  const authLinks = (
    <a className="navbar__top__auth__link" onClick={logout} href="/login">
      Cerrar sesion
    </a>
  );

  const guestLinks = (
    <>
      <Link className="navbar__top__auth__link" to="/login">
        Iniciar sesion
      </Link>
      <Link className="navbar__top__auth__link" to="/signup">
        Registrarse
      </Link>
    </>
  );

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
              <div className="navbar__top__auth">
                {/* {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>} */}
              </div>
            </div>
            
          </nav>
        
      </Navbar>
    </>
  );
};



export default NavBar;
