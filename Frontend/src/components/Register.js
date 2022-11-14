import React, { useState } from 'react'
import { useNavigate ,Link } from 'react-router-dom'
import axiosInstance from '../utils/AxiosInstance'
export default function Register() {

  let navigate = useNavigate()
  const [details, setdetails] = useState({ name: '', email: '', password: '', cpassword: '', tc: '' })

  const handleregister = async (e) => {
    e.preventDefault()

    try {
      const res = await axiosInstance.post(`/api/register/` ,  {
        data: {
        'email': details.email,
        'name': details.name,
        'password': details.password,
        'password2': details.cpassword,
        'tc': true
      }})
      localStorage.setItem('token', JSON.stringify(res.data.token.access))
      navigate('/')
    }
    catch (error) {
      alert('Invalid Credentials')
    }
  }
  const onchange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value })
  }
  return (
    <div><section className="vh-100" style={{ background_color: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ border_radius: "25px;" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{ color: "darkblue" }}>Sign up</p>

                    <form className="mx-1 mx-md-4" onSubmit={handleregister}>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                          <input required type="text" id="form3Example1c" name='name' autoComplete='on' onChange={onchange} className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          <input required type="email" id="form3Example3c" name='email' autoComplete='on' onChange={onchange} className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                          <input required type="password" id="form3Example4c" name='password' onChange={onchange} className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4c">Confirm Password</label>
                          <input required type="password" id="form3Example4c" name='cpassword' onChange={onchange} className="form-control" />
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input required className="form-check-input me-2" type="checkbox" value="true" onChange={onchange} id="form2Example3c" name='tc' />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className=" d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="container btn btn-primary btn-lg btn-block">Create Account</button>
                      </div>

                    </form>
                    <div className="divider d-flex align-items-center my-4" >
                      <hr />
                      <p className="text-center fw-bold  mb-0 text-muted" style={{ marginLeft: "210px" }}>OR</p>
                    </div>
                    <div className=" d-flex justify-content-center mx-4  mb-lg-4">

                    <p>Already have an account ?<Link   to="/login"
                      >Login
                    </Link></p>
                    </div>


                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample " />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section></div>
  )
}
