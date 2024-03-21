/* eslint-disable react/prop-types */
import { createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate} from "react-router-dom";
import swal from 'sweetalert2';
import axios from "axios";


const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );

     const [profile, setProfile] = useState({})
    
    const [loading, setLoading] = useState(true);

    const uploadDataProfile = async ()=> {
        try {
            const res = await axios.get(`https://sgo-django.azurewebsites.net/api/profile/set/${user.user_id}/`)
            setProfile(res.data)
        } catch (error) {
            console.error(error)
        }
    }
    
    const loginUser = async (email, password) => {

        const response = await fetch("https://sgo-django.azurewebsites.net/api/token/", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        const data = await response.json()
        

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            swal.fire({
                title: "Sesion iniciada correctamente",
                icon: "success",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
            uploadDataProfile()
            const rol = jwtDecode(data.access).rol
            if( rol === 1 || rol === 2 || rol ===5)
                return navigate('/home')
            else
                return navigate('/obras')
        } else {
            console.log("there was a server issue");
            swal.fire({
                title: "Usuario o contraseña no existe",
                icon: "error",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const registerUser = async (email, username, rol, password, password2) => {
        const response = await fetch("https://sgo-django.azurewebsites.net/api/accounts/registrar/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, rol, password, password2
            })
        })
        if(response.status === 201){
            navigate("/login")
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "A ocurrido un error: " + response.status,
                icon: "error",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const logoutUser = async (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const body = JSON.stringify({'is_connected': false})
        try {
            const response = await axios.patch(`https://sgo-django.azurewebsites.net/api/accounts/logout/${id}/`, body, config)
          
        } catch (error) {
            console.error(error)
        }
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate("/login")
        swal.fire({
            title: "Sesion cerrada exitosamente...",
            icon: "success",
            toast: true,
            timer: 5000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        profile,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
            uploadDataProfile()
        }
        setLoading(false)
    }, [authTokens, loading])
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

    

}