import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import Alert from "../Alert";
import PropTypes from "prop-types";
import "./Navbar.css";
import logogrupo from "../../img/logogrupo.png";

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
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
                <Navbar.Brand href="home">
                  <img
                    src={logogrupo}
                    alt="logo"
                    className="d-inline-block allign-top"
                  />
                </Navbar.Brand>
              </div>
              <div className="navbar__top__auth">
                {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
              </div>
            </div>
            
          </nav>
          <Alert />
        
      </Navbar>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
