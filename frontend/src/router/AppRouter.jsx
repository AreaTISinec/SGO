
import Home from "../containers/Home/Home"
import Login from "../containers/Login/Login"
import Signup from "../containers/Signup/Signup"
import Layout from "../hocs/Layout"
import Obras from '../components/Obras/Obras'
import UploadFile from '../containers/UploadFile/UploadFile'
import NotFound from '../components/NotFound'
import PrivateRoute from '../utils/PrivateRoute'
import DetalleObra from '../components/Obras/DetalleObra'
import NuevaObra from '../components/Obras/NuevaObra'
import CentroDeNegocios from '../components/Centro de Negocios/CentroDeNegocios'
import DetalleCentroDeNegocios from '../components/Centro de Negocios/DetalleCentroDeNegocios'
import NuevoCentroDeNegocios from '../components/Centro de Negocios/NuevoCentroDeNegocios'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return <>
    <Layout>

    <Routes>
        <Route path='/' element={<Login/>}>
            
        </Route> 
        <Route  path="/login" element={<Login/>} />
        <Route path="/signup" 
            element={
                <PrivateRoute>
                    <Signup/>
                </PrivateRoute>} 
        />
        <Route path="/home" 
            element={
                <PrivateRoute> 
                    <Home/>
                </PrivateRoute>}
        />
        <Route path="/obras" 
            element={
                <PrivateRoute>
                    <Obras />
                </PrivateRoute>} 
        />
        <Route path="/obras/:idObra" 
            element={
                <PrivateRoute>
                    <DetalleObra />
                </PrivateRoute>} 
        />
        <Route path="/obras/nueva-obra" 
            element={
                <PrivateRoute>
                    <NuevaObra />
                </PrivateRoute>} 
        />
        <Route path="/centro-de-negocios" 
            element={
                <PrivateRoute>
                    <CentroDeNegocios />
                </PrivateRoute>} 
         />
        <Route path="/centro-de-negocios/:idCentroDeNegocios" 
            element={
            <PrivateRoute>
                <DetalleCentroDeNegocios />
            </PrivateRoute>}
        />
        <Route path="/centro-de-negocios/nuevo-centro-de-negocios" 
            element={
            <PrivateRoute>
                <NuevoCentroDeNegocios />
            </PrivateRoute>}
        />
        <Route path="/docs/upload/" 
            element={
            <PrivateRoute>
                <UploadFile />
            </PrivateRoute>} 
        />
        <Route path="/*" element={NotFound} />
    </Routes>
    </Layout>
  </>
}

export default AppRouter
