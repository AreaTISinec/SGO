import Spinner from 'react-bootstrap/Spinner';
import { Helmet } from 'react-helmet'
import { useContext, useState } from "react"
import './Login.css'
import AuthContext from "../../context/AuthContext"
import useForm from '../../utils/useForm'


const Login = () => {
   
  const { email, password, onInputChange, onResetForm } = useForm({
    email: '',
    password: ''
  })

  const {loginUser} = useContext(AuthContext)
  
  const onLogin = (e) => {
    e.preventDefault()

    loginUser(email, password)
    onResetForm()
  }

  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    if(email !== '' && password !== '')
      setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 2650);
  }

  return (
    <div className="auth_">
      <Helmet>
        <title> </title>
        <meta name="description" content="login page"/>
      </Helmet>
      <h1 className="auth_tittle">Iniciar sesion</h1>
      <p className="auth_lead">Ingresa a tu cuenta</p>
      <form onSubmit={onLogin}>
        <div className="auth_form_group">
          <input
            className="auth_form_input"
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={onInputChange}
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
            onChange={onInputChange}
            required
          />
        </div>
        <button className="auth_form_button" type="submit" onClick={handleClick}>
          Iniciar Sesion
        </button>
        <div className='spinnerLoading'>
          { loading ?
            <Spinner animation="border" variant="danger" className='spinnerLoading' />
          :
            <></>
          }
        </div>
      </form>
    </div>
  )
}


export default Login