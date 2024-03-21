import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./SidebarV2.css";
import AuthContext from "../../context/AuthContext";

const SidebarV2 = () => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext)

    const [openSidebar, setOpenSidebar] = useState(false);

    const dropdownMenu = () => {
        setOpenSidebar(!openSidebar)
    }

    return (
        <div className={`${openSidebar ? "SidebarContainerVisible" : "SidebarContainerInvisible"}`}>
            <>
                {openSidebar ? (
                    <>
                        <div className="BotonDespliegue">
                            <Button
                                style={{ color: "#333333", borderColor: "#333333", justifyContent: "flex-end" }}
                                variant="outline-light"
                                onClick={dropdownMenu}
                            >&lt;</Button>
                            
                        </div>
                        <div className="botonera">
                        {
                            (user.rol == 1 || user.rol == 2 || user.rol == 5) ? 
                                <button
                                    className="BotonNavigate"
                                    onClick={() => {navigate("/home")}}
                                >
                                    Dashboard
                                </button> 
                            : <></>

                        }
                            <button
                                className="BotonNavigate"
                                onClick={() => {navigate("/obras")}}
                            >
                                Obras
                            </button>
                            <button
                                className="BotonNavigate"
                                onClick={() => {navigate("/facturacion")}}
                            >
                                Facturacion
                            </button>
                        </div>
                        <div style={{ visibility: "hidden" }}></div>
                    </>
                )
                :
                    <Button
                        style={{ color: "#333333", borderColor: "#333333" }}
                        variant="outline-light"
                        onClick={dropdownMenu}
                    >&gt;</Button>

                } 
            </>
        </div>
    )
};

export default SidebarV2;