import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

let baseURL='http://127.0.0.1:8000'
let authTokens=JSON.parse(localStorage.getItem('token'))?JSON.parse(localStorage.getItem('token')):null
const axiosInstance=axios.create({
    baseURL,
    headers:{
        Authorization:authTokens?`Bearer ${JSON.parse(localStorage.getItem('token'))}`:null,
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
    }

})

axiosInstance.interceptors.request.use(async req=>{
    if(!authTokens){
        authTokens=JSON.parse(localStorage.getItem('token'))?JSON.parse(localStorage.getItem('token')):null
        req.headers.Authorization=authTokens?`Bearer ${authTokens}`:null
    }
    const user=jwt_decode(authTokens)
    const isExpired=dayjs.unix(user.exp).diff(dayjs()) < 1
    console.log(dayjs.unix(user.exp).diff(dayjs()))
    console.log('2' , isExpired)
    if(!isExpired) return req
    console.log(isExpired)
    const response = await axios.post(`${baseURL}/api/token/refresh/`,{
        refresh:JSON.parse(localStorage.getItem('rtoken')),
    })
    console.log(response)
    localStorage.setItem('token' , JSON.stringify(response.data.access))
    console.log('111',JSON.parse(localStorage.getItem('token')))
    console.log('222',response.data.access)
    req.headers.Authorization=response.data.access
    return req
})

export default axiosInstance;
