import { useState, useContext } from "react";
import { Link,  } from "react-router-dom";
import { Helmet } from "react-helmet";
import { setAlert } from "../../actions/alert";
import { signup } from "../../actions/auth";
import AuthContext from '../../context/AuthContext'
import "./Singup.css";

const Signup = () => {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [rol, setRol] = useState(1)
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const {registerUser} = useContext(AuthContext)


  const handleSubmit = async e => {
    e.preventDefault()
    registerUser(email, username, rol, password, password2)
    console.log(email, username, rol, password, password2)
  }


    if(password !== password2){
      setAlert("Contraseñas no coinciden", "error");
    }else {
      signup({ email, username, rol, password, password2});
    }

  return (
    <div className="auth__">
      <Helmet>
        <title> </title>
        <meta name="description" content="signup page" />
      </Helmet>
      <h1 className="auth__tittle">Registrarse</h1>
      <p className="auth__lead">Crea tu cuenta</p>
      <form onSubmit={handleSubmit}>
        <div className="auth__form__group">
          <label className="auth__form__group__label">Nombre: </label>
          <input
            className="auth__form__input"
            type="text"
            placeholder="Nombre"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="auth__form__group">
          <label className="auth__form__group__label">Selecciona un rol: </label>
          <select className="auth__form__input" id="rol" name="rol" onChange={(e) => setRol(e.target.value)}>
            <option value="1">SAdmin</option>
            <option value="2">CG</option>
            <option value="3">Admintrador</option>
            <option value="4">Supervisor</option>
            <option value="5">Gerencia</option>
          </select>
        </div>
        <div className="auth__form__group">
          <label className="auth__form__group__label">Email: </label>
          <input
            className="auth__form__input"
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth__form__group">
          <label className="auth__form__group__label">contraseña: </label>
          <input
            className="auth__form__input"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="auth__form__group">
          <label className="auth__form__group__label">Confirmar contraseña: </label>
          <input
            className="auth__form__input"
            type="password"
            placeholder="Confirmar contraseña"
            name="re_password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <button className="auth__form__button">Registrate</button>
      </form>
      <p className="auth__authtext">
        ¿Ya tienes una cuenta? <Link className="auth__authtext__link" to="../login">Inicia sesion</Link>
      </p>
    </div>
  )
}


export default Signup