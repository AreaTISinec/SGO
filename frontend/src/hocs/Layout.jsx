/* eslint-disable react/prop-types */

import NavBar from '../components/Navbar/Navbar'
import './Layout.css'

const Layout = ({children}) => {
  return (
    <div>
      <NavBar />
      {children}  
    </div>
  )
}

export default Layout