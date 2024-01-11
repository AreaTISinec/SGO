/* eslint-disable react/prop-types */

import Navbar from '../components/Navbar/Navbar'


const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        {children}  
    </div>
  )
}

export default Layout
