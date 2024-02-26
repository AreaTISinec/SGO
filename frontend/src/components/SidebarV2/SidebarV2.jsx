import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./SidebarV2.css";

const SidebarV2 = () => {
    const navigate = useNavigate();

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
                        <div>
                            <button
                                className="BotonNavigate"
                                onClick={() => {navigate("/home")}}
                            >
                                Home
                            </button>
                            <button
                                className="BotonNavigate"
                                onClick={() => {navigate("/obras")}}
                            >
                                Obras
                            </button>
                            <button
                                className="BotonNavigate"
                                onClick={() => {navigate("/centro-de-negocios")}}
                            >
                                Negocios
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