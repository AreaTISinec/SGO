import { Link } from 'react-router-dom'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Sidebar.css'


const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const Despliegue = () => {
    if(openMenu){
      return (

        <div className='DespliegueContainer'>
          <Link className='LinksDespliegue' to="/">Home</Link>
          {/* <Link className='LinksDespliegue' to="/dashboard">Dashboard</Link> */}
          {/* <Link className='LinksDespliegue' to="/documentos">Documentos</Link> */}
          <Link className='LinksDespliegue' to="/obras">Obras</Link>
          {/* <Link className='LinksDespliegue' to="/perfil">Perfil</Link> */}
         </div>
      )
    }
  }

  return (
    <div className={` ${openMenu ? 'MenuVisible' : 'MenuContainer'}`}>
      <div>
        {openMenu ? <div className='BotonMenu'><Button style={ {color: '#000'}} variant='outline-light' onClick={toggleMenu} >&lt;</Button></div> : <div className='BotonMenu'><Button style={ {color: '#000'}} variant='outline-light' onClick={toggleMenu} >&gt;</Button></div>  } 
        {/* importar los iconos desde bootstrap */}
        <div className='Despliegue'><Despliegue/></div>
      </div>
    </div>
  );
};

export default Sidebar;