import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { setAlert } from "../../actions/alert"
import { signup } from "../../actions/auth"
import PropTypes from 'prop-types'

const Signup = ({ setAlert, signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    re_password: '',
    rol: 1
  })

  const { username, email, password, re_password, rol } = formData;

  const navigate = useNavigate()

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if(password !== re_password)
      setAlert('Contraseñas no coinciden', 'error')
    else{
      signup({ username, email, password, re_password, rol})
    }
  }

  useEffect(() => {
    // Check if isAuthenticated has changed
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);




  return (
    <div className="auth">
      <Helmet>
        <title> </title>
        <meta 
          name="description"
          content="signup page"
        />
      </Helmet>
      <h1>Registrarse</h1>
      <p>Crea la cuenta</p>
      <form onSubmit={e => onSubmit(e)}>
      <div>
          <label>Nombre:  </label>
          <input 
            className="auth_form_input" 
            type="text" 
            placeholder="Nombre" 
            name="username" 
            value={username} 
            onChange={e => onChange(e)} 
            required 
          />
        </div>
        <div>
          <label>Selecciona un rol: </label>
          <select id="rol" name="rol" onChange={e => onChange(e)}>
            <option value="1">SAdmin</option>
            <option value="2">CG</option>
            <option value="3">Admintrador</option>
            <option value="4">Supervisor</option>
            <option value="5">Gerencia</option>
          </select>
        </div>
        <div>
          <label>Email: </label>
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
        <div>
          <label>contraseña: </label>
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
        <div>
          <label>Confirmar contraseña: </label>
          <input 
            className="auth_form_input" 
            type="password" 
            placeholder="Confirmar contraseña" 
            name="re_password" 
            value={re_password} 
            onChange={e => onChange(e)} 
            required 
          />
        </div>
        <button>Iniciar Sesion</button>
      </form>
    </div>
  )
}

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, signup })(Signup)
