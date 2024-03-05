import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const URL = "https://sgo-django.azurewebsites.net/api"

const useAxios = () => {
    const [authTokens, setUser, setAuthTokens] = useContext(AuthContext)

    const axiosInstance = axios.create({
        URL,
        headers: {Authorization: `Bearer ${authTokens?.acces}`}
    }).access

    axiosInstance.interceptors.request(async req => {
        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

        if(isExpired) return req

        const response = await axios.post(`${URL}/token/refresh/` , {
            refresh: authTokens.refresh
        })
        localStorage.setItem("authTokens", JSON.stringify(response.data))
        //localStorage.setItem("authTokens", JSON.stringify(response.data))

        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))

        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })

    return axiosInstance
}

export default useAxios