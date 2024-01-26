import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from "./containers/Home/Home"
import Login from "./containers/Login/Login"
import Signup from "./containers/Signup/Signup"
import Layout from "./hocs/Layout"
import Obras from './components/Obras/Obras'
import { Provider } from 'react-redux'
import UploadFile from './containers/UploadFile/UploadFile'
import NotFound from './components/NotFound'

import store from './store'
import DetalleObra from './components/Obras/DetalleObra'
import CentroDeNegocios from './components/Centro de Negocios/CentroDeNegocios'
import DetalleCentroDeNegocios from './components/Centro de Negocios/DetalleCentroDeNegocios'
import NuevoCentroDeNegocios from './components/Centro de Negocios/NuevoCentroDeNegocios'

const App = () => 
{
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route  path="/" element={<Navigate to = "/login"/>} /> 
            <Route  path="/signup" element={<Signup/>} />
            <Route  path="/login" element={<Login/>} />
            {/* <Route  path="/" element={<Home/>} /> ESTA RUTA ES MOMENTANEA */}
            <Route  path="/home" element={<Home/>} /> {/*ACA DEBERIA IR EL LOGIN PARA MOSTRAR AL INGRESAR AL SISTEMA */}
            <Route  path="/obras" element={<Obras/>} />
            <Route  path="/obras/:idObra" element={<DetalleObra />} />
            <Route  path="/centro-de-negocios" element={<CentroDeNegocios />} />
            <Route  path="/centro-de-negocios/:idCentroDeNegocios" element={<DetalleCentroDeNegocios />} />
            <Route  path="/centro-de-negocios/nuevo-centro-de-negocios" element={<NuevoCentroDeNegocios />} />
            <Route  path="/docs/upload/" element={<UploadFile/>} />
            <Route element={NotFound} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App

//<Home/>


//REDIRIGIR AL HOME LUEGO DE REGISTRARTE O LOGEARTE
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

// // Componente de la página de registro
// const Register = ({ setRegistered }) => {
//   const handleRegistration = () => {
//     // Lógica de registro (puedes agregar tu propia lógica aquí)
//     // ...

//     // Después de registrar al usuario, establece 'registered' en true
//     setRegistered(true);
//   };

//   return (
//     <div>
//       <h2>Registro</h2>
//       <button onClick={handleRegistration}>Registrar</button>
//     </div>
//   );
// };

// // Componente de la página de inicio
// const Home = () => (
//   <div>
//     <h2>Bienvenido a la página de inicio</h2>
//   </div>
// );

// // Componente principal que incluye enrutamiento
// const App = () => {
//   const [registered, setRegistered] = useState(false);

//   return (
//     <Router>
//       <Route path="/register">
//         /* Si el usuario está registrado, redirigir a la página de inicio */
//         {registered ? <Redirect to="/home" /> : <Register setRegistered={setRegistered} />}
//       </Route>

//       {/* Ruta para la página de inicio */}
//       <Route path="/home" component={Home} />

//       {/* Otras rutas pueden agregarse según sea necesario */}
//     </Router>
//   );
// };
