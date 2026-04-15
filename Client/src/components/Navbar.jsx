import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../App'
import Logo from './../assets/logo.png'
import { useSelector } from 'react-redux'

function Navbar() {

  const navigate = useNavigate()
  const { setUser } = useContext(authContext)
  const cart = useSelector(state => state.cartReducer.cart)

  const handleLogout = () => {
    setUser(null)
    window.sessionStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/home">
          <img src={Logo} alt="logo" style={{ width: 60 }} />
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Left Links */}
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/home/orders">Orders</Link>
            </li>

          </ul>

          {/* Right Side */}
          <ul className="navbar-nav align-items-center">

            {/* Cart with Badge */}
            <li className="nav-item me-3">
              <Link className="nav-link position-relative" to="/home/cart">
                Cart
                <span className="badge bg-warning text-dark ms-1">
                  {cart.length}
                </span>
              </Link>
            </li>

            {/* Profile */}
            <li className="nav-item me-3">
              <Link className="nav-link" to="/home/profile">
                Profile
              </Link>
            </li>

            {/* Logout */}
            <li className="nav-item">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar