import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/user'
import { toast } from 'react-toastify'
import { authContext } from '../App'

function Login() {

  const { setUser } = useContext(authContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSigninClick = async () => {
    if (!email || !password) {
      toast.warning("Please enter email and password")
      return
    }

    try {
      const response = await loginUser(email, password)

      if (response.status === 'success') {
        toast.success('Login successful')

        setUser({ phone: response.data.phone })
        window.sessionStorage.setItem('token', response.data.token)

        navigate('/home')
      } else {
        toast.error('Invalid Credentials')
      }

    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>

      <div className="col-lg-4 col-md-6 col-12">

        <div className="card shadow p-4">

          {/* Title */}
          <div className="text-center mb-4">
            <h3>Login</h3>
            <p className="text-muted">Welcome back 👋</p>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Register Link */}
          <div className="mb-3 text-center">
            <small>
              Don't have an account?{" "}
              <Link to="/register">Register</Link>
            </small>
          </div>

          {/* Button */}
          <button
            className="btn btn-success w-100"
            onClick={handleSigninClick}
          >
            Sign In
          </button>

        </div>

      </div>

    </div>
  )
}

export default Login