/* eslint-disable react-refresh/only-export-components */
/*
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Navbar.css'

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand><Link to={'/'}>NoName</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to='/'>Inicio</Link></Nav.Link>
            <Nav.Link><Link to='/login'>Iniciar Sesion</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar

*/

import { Link, NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { logout } from "../../actions/auth"
import Alert from "../Alert"
import PropTypes from 'prop-types'
import './Navbar.css'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <a className="navbar__top__auth__link" onClick={logout} href="#!">Cerrar sesion</a>
  );

  const guestLinks = (
    <>
      <Link className="navbar__top__auth__link" to='/login'>Iniciar sesion</Link>
      <Link className="navbar__top__auth__link" to='/signup'>Registrarse</Link>
    </>
  );
  
  return(
    <>
      <nav className="navbar">
        <div className="navbar__top">
          <div className="navbar__top__logo">
            <Link className="navbar__top__logo__link" to='/'>NoName</Link>
          </div>
          <div className="navbar__top__auth">
            { !loading && (<>{ isAuthenticated ? authLinks : guestLinks}</>)}
          </div>
        </div>
        <div className="navbar__bottom">
          <li className="navbar__bottom__item">
            <NavLink to='/'>Inicio</NavLink>
          </li>
          <li className="navbar__bottom__item">
            <NavLink to='/documents'>Documentos</NavLink>
          </li>
          <li className="navbar__bottom__item">
            <NavLink to='/dashboard'>Dashboard</NavLink>
          </li>
        </div>
      </nav>
      <Alert/>
    </>
  )

}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
