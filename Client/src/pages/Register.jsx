import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/user'
import { toast } from 'react-toastify'

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const navigate = useNavigate()

  const handleSignupClick = async () => {

    if (!name || !email || !password || !phone) {
      toast.warning("All fields are required")
      return
    }

    try {
      const response = await registerUser(name, email, password, phone)

      if (response.status === 'success') {
        toast.success('Registration successful')
        navigate('/')
      } else {
        toast.error(response.error || "Registration failed")
      }

    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>

      <div className="col-lg-4 col-md-6 col-12">

        <div className="card shadow p-4">

          {/* Title (same style as login) */}
          <div className="text-center mb-4">
            <h3>Register</h3>
            <p className="text-muted">Create your account 🚀</p>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
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

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter mobile number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Login Link (same style) */}
          <div className="mb-3 text-center">
            <small>
              Already have an account?{" "}
              <Link to="/">Login</Link>
            </small>
          </div>

          {/* Button */}
          <button
            className="btn btn-success w-100"
            onClick={handleSignupClick}
          >
            Sign Up
          </button>
        </div>

      </div>

    </div>
  )
}

export default Register