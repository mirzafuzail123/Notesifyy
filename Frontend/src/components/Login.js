import React, { useState , useContext } from 'react'
import axiosInstance from '../utils/AxiosInstance'
import AlertContext from '../context/AlertContext'
import Alerts from './Alerts'
import { Link, useNavigate } from "react-router-dom"
export default function Login() {

    let navigate = useNavigate()
    const [credentials, setcredentials] = useState({ email: '', password: '' })
    const {alert , showAlert} = useContext(AlertContext)

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await axiosInstance.post('/api/login/',{

                    'email': credentials.email,
                    'password': credentials.password
            })
            console.log(res.data.token)
            localStorage.setItem('token', JSON.stringify(res.data.token.access ))
            localStorage.setItem('rtoken', JSON.stringify(res.data.token.refresh))
            localStorage.setItem('user',res.data.user )
            navigate('/')
            showAlert('Logged in successfully' , 'success')
        } catch (error) {
           showAlert('Invalid credentials' , 'danger')
        }

    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>

            <div>
                <Alerts alert={alert} ></Alerts>
                <section className="vh-100">
                    <div className="container py-5 h-100">
                        <div className="row d-flex align-items-center justify-content-center h-100">
                            <div className="col-md-8 col-lg-7 col-xl-6">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                    className="img-fluid" alt="Phone " />
                            </div>
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <div className="card">
                                    <div className="card-body py-5 px-md-5">
                                        <h1 className='text-center' style={{ color: "darkblue" }}>Login to Notesify</h1>
                                        <p className='text-center' style={{ marginBottom: "60px" }}>Please enter your credentials</p>
                                        <form onSubmit={handleLogin}>
                                            <div className="form-outline col-xs- mb-4">
                                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                                                <input type="email" id="form3Example3" name='email' onChange={onChange} autoComplete='on' className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4">Password</label>
                                                <input type="password" id="form3Example4" name='password' onChange={onChange} autoComplete='on' className="form-control form-control-lg" />
                                            </div>

                                            <div className="d-flex justify-content-around align-items-center mb-4">

                                                <Link to="/!">Forgot password?</Link>
                                            </div>

                                            <button type="submit" className="container btn btn-primary btn-lg btn-block">Log in</button>

                                        </form>
                                        <div className="divider d-flex align-items-center my-4" >
                                            <hr/>
                                            <p className="text-center fw-bold  mb-0 text-muted" style={{marginLeft:"250px"} }>OR</p>
                                        </div>

                                        <Link className="container btn btn-primary btn-lg btn-block" style={{backgroundColor: "#3b5998"}} to="/register"
                                            role="button">Create an account
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section></div>
        </>
    )
}
