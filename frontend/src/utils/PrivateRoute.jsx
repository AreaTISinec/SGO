import { Navigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import dayjs from "dayjs";

const PrivateRoute = ({ children }) => {
    let {user} = useContext(AuthContext)

    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    
    return !isExpired ? children : <Navigate to="/login" replace/>
};
export default PrivateRoute
