/* eslint-disable react/prop-types */

import { Outlet } from 'react-router-dom'
import NavBar from '../components/Navbar/Navbar'
import './Layout.css'

const Layout = ({children}) => {
  return (
    <div>
      <NavBar />
        {children}
      <Outlet/>
    </div>
  )
}

export default Layout