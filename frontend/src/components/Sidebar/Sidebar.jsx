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
          <ul>
            <h5>Dashboard</h5>
            <h5>Obras</h5>
            <h5>Perfil</h5>
          </ul>
        </div>
      )
    }
  }

  return (
    <div className={` ${openMenu ? 'MenuVisible' : 'MenuContainer'}`}>
      <div>
        {openMenu ? <div className='BotonMenu'><Button variant='outline-light' onClick={toggleMenu} >&lt;</Button></div> : <div className='BotonMenu'><Button variant='outline-light' onClick={toggleMenu} >&gt;</Button></div>  } 
        {/* importar los iconos desde bootstrap */}
        <div className='Despliegue'><Despliegue/></div>
      </div>
    </div>
  );
};

export default Sidebar;