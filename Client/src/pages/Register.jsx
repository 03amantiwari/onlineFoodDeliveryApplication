import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { registerUser } from '../services/user'
import {toast} from 'react-toastify'


function Register() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState('')

  const navigate = useNavigate()

  const handleSignupClick =async ()=>{
    try {
      const response = await registerUser(name,email,password,phone)
      if(response.status=='success'){
        toast.success('Registration successful')
        navigate('/')
      }
      else{
        toast.error(response.error)
      }
    } catch (error) {
      window.alert(error)
    }
  }
  return (
    <div>
            <div className="container w-50">
                <h2 className="mb-3">Register</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Name</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter name" onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Enter mobile no" onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Already have an account ?</label>
                    <Link to='/'>Click Here To Signin</Link>
                </div>
                <div className="mb-3">
                    <button className="btn btn-success" onClick={handleSignupClick}>Signup</button>
                </div>
            </div>
        </div>
  )
}

export default Register
