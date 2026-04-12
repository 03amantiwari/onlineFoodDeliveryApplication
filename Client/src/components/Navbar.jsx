import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../App'
import Logo from './../assets/logo.png'


function Navbar() {
    const navigate =useNavigate()
    const {setUser} = useContext(authContext)
  
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <span className="navbar-brand" href="#">
                    <Link className="nav-link" aria-current="page" to="/home">
                        <img src={Logo} alt="" style={{ width: 80 }} />
                    </Link>
                </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/cart">Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/orders">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={()=>{
                                setUser(null)
                                window.sessionStorage.removeItem('token')
                                navigate('/')
                            }} >Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  )
}

export default Navbar
