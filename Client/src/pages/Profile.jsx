import React, { useState, useEffect } from 'react'
import { getUser, updateUser } from '../services/user'
import { toast } from 'react-toastify'

function Profile() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const getUserProfile = async () => {
    const token = window.sessionStorage.getItem('token')
    try {
      const response = await getUser(token)

      setName(response.data.name)
      setEmail(response.data.email)
      setPhone(response.data.phone)

    } catch (error) {
      toast.error("Failed to load profile")
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  const handleUpdateClick = async () => {
    const token = window.sessionStorage.getItem('token')
    try {
      const response = await updateUser(phone, token)

      if (response.status === 'success') {
        toast.success('Profile Updated Successfully!!')
      } else {
        toast.error('Profile Not Updated!!')
      }

    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-lg-6 col-md-8 col-12">

          <div className="card shadow p-4">

            {/* Header */}
            <div className="text-center mb-4">
              <h3>My Profile</h3>
              <p className="text-muted">Manage your account details</p>
            </div>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                readOnly
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                readOnly
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              className="btn btn-success w-100"
              onClick={handleUpdateClick}
            >
              Update Profile
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile