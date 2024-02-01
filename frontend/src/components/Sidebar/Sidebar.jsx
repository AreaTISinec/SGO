import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const Despliegue = () => {
    if (openMenu) {
      return (
        <div className="DespliegueContainer">
          <button
            className="BotonNavigate"
            onClick={() => handleNavigation("/home")}
          >
            Home
          </button>
          <button
            className="BotonNavigate"
            onClick={() => handleNavigation("/obras")}
          >
            Obras
          </button>
          <button
            className="BotonNavigate"
            onClick={() => handleNavigation("/centro-de-negocios")}
          >
            Negocios
          </button>
          <button
            className="BotonNavigate"
            onClick={() => handleNavigation("/docs/upload")}
          >
            Subir archivo
          </button>
        </div>
      );
    }
  };

  return (
    <div className={` ${openMenu ? "MenuVisible" : "MenuContainer"}`}>
      <div>
        {openMenu ? (
          <div className="BotonMenu">
            <Button
              style={{ color: "#333333", borderColor: "#333333" }}
              variant="outline-light"
              onClick={toggleMenu}
            >
              &lt;
            </Button>
          </div>
        ) : (
          <div className="BotonMenu">
            <Button
              style={{ color: "#333333", borderColor: "#333333" }}
              variant="outline-light"
              onClick={toggleMenu}
            >
              &gt;
            </Button>
          </div>
        )}
        {/* importar los iconos desde bootstrap */}
        <div className="Despliegue">
          <Despliegue />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
