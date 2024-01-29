import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { setAlert } from "../../actions/alert";
import { signup } from "../../actions/auth";
import "./Singup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
    rol: 1,
  });

  const { username, email, password, re_password, rol } = formData;

  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== re_password) setAlert("Contraseñas no coinciden", "error");
    else {
      signup({ email, password, re_password, rol, username });
    }
  };

  useEffect(() => {
    // Check if isAuthenticated has changed
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth__">
      <Helmet>
        <title> </title>
        <meta name="description" content="signup page" />
      </Helmet>
      <h1 className="auth__tittle">Registrarse</h1>
      <p className="auth__lead">Crea tu cuenta</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="auth__form__group">
          <label className="auth__form__group__label">Nombre: </label>
          <input
            className="auth__form__input"
            type="text"
            placeholder="Nombre"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="auth__form__group">
          <label className="auth__form__group__label">Selecciona un rol: </label>
          <select className="auth__form__input" id="rol" name="rol" onChange={(e) => onChange(e)}>
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
            onChange={(e) => onChange(e)}
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
            onChange={(e) => onChange(e)}
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
            value={re_password}
            onChange={(e) => onChange(e)}
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