/* eslint-disable react-refresh/only-export-components */
/*
import { useState } from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { login } from "../actions/auth";

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;


  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  }

  //si esta autenticado
  //redirect a su pagina principal  
  return(
    <div className="container mt-5 ">
      <h1>Sign In</h1>
      <p>Ingresa a tu cuenta</p>
      <form onSubmit= {e => onSubmit(e)}>
        <div className="form-group mb-3">
          <input 
            className="form-control"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          / >
        </div>
        <div className="form-group mb-3">
          <input 
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <button className="btn btn-primary mb-3" type="submit">Login</button>
      </form>
      <p className="mt-3">
        ¿No tienes cuenta? <Link to='/signup'> Registrate.</Link>
      </p>
      
    </div>
  )
};


export default connect(null, { login })(Login);
*/

import {  Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { login } from "../../actions/auth"
import { useState, useEffect } from "react"
import './Login.css'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate()

  const { email, password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault()

    login(email, password);
  
  };
  
  useEffect(() => {
    // Check if isAuthenticated has changed
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);
  

  
  return (
    <div className="auth_">
      <Helmet>
        <title> </title>
        <meta name="description" content="login page"/>
      </Helmet>
      <h1 className="auth_tittle">Iniciar sesion</h1>
      <p className="auth_lead">Ingresa a tu cuenta</p>
      <form onSubmit={e => onSubmit(e)}>
        <div className="auth_form_group">
          <input 
            className="auth_form_input" 
            type="email" 
            placeholder="email" 
            name="email" 
            value={email} 
            onChange={e => onChange(e)} 
            required 
          />
        </div>
        <div className="auth_form_group">
          <input 
            className="auth_form_input" 
            type="password" 
            placeholder="password" 
            name="password" 
            value={password} 
            onChange={e => onChange(e)} 
            required 
          />
        </div>
        <button className="auth_form_button">Iniciar Sesion</button>
      </form>
      <p className="auth_authtext">
        ¿No tienes cuenta? <Link className="auth_authtext_link" to='../signup'>Registrate</Link>
      </p>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login }) (Login)