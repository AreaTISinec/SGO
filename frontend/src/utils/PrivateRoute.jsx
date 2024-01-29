import { Route, useNavigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const PrivateRoute = ({ children, ...rest}) => {
    const navigate = useNavigate();

    let {user} = useContext(AuthContext)
    return <Route {...rest}> {user ? navigate("/login") : children} </Route>
}

export default PrivateRoute