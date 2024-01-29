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

import {  Link,  } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { login } from "../../actions/auth"
import { useContext, useState } from "react"
import './Login.css'
import AuthContext from "../../context/AuthContext"

const Login = () => {
   const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

    const {loginUser} = useContext(AuthContext)
    // const handleSubmit = e => {
    //   const email = e.target.email.value
    //   const password = e.target.password.value

    //   email.length > 0 && loginUser(email,password)

    //   console.log(email)
    //   console.log(password)
    // }

  const { email, password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault()
    console.log(email)
    console.log(password)
    loginUser(email, password);

  };

  //useEffect(() => {
  //   // Check if isAuthenticated has changed
  //   if (isAuthenticated) {
  //     navigate('/home');
  //   }
  // }, [isAuthenticated, navigate]);



  return (
    <div className="auth_">
      <Helmet>
        <title> </title>
        <meta name="description" content="login page"/>
      </Helmet>
      <h1 className="auth_tittle">Iniciar sesion</h1>
      <p className="auth_lead">Ingresa a tu cuenta</p>
      <form onSubmit={onSubmit}>
        <div className="auth_form_group">
          <input
            className="auth_form_input"
            type="email"
            placeholder="email"
            name="email"
            //value={loginUser.email}
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
            //value={loginUser.password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <button className="auth_form_button" type="submit">Iniciar Sesion</button>
      </form>
    </div>
  )
}


export default Login