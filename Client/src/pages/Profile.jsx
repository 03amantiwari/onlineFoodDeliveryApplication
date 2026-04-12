import React ,{useState,useEffect} from 'react'
import { getUser, updateUser } from '../services/user'
import { toast } from 'react-toastify'

function Profile() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')

    const getUserProfile = async ()=>{
      const token = window.sessionStorage.getItem('token')
      try{
        const response = await getUser(token)
        setName(response.data.name)
        setEmail(response.data.email)
        setPhone(response.data.phone)
        console.log(response)
      }
      catch(error){
        window.alert(error)
      }
    }
  
   
    useEffect(()=>{
      getUserProfile()
    },[])

    const handleUpdateClick =async ()=>{
      const token = window.sessionStorage.getItem('token')
      try{
        const response = await updateUser(phone,token)
        if(response.status=='success'){
          toast.success('Profile Updated Successfully!!')
        }
        else{
          toast.error('Profile Not Updated!!')
        }
      }
      catch(error){
        window.alert(error)
      }
    }
  
  
    return (
      <div>
              <div className="container m-3">
                  <div className="row">
                      <div className="col-6">
                          <div className="mb-3">
                              <label htmlFor="username" className="form-label">Name</label>
                              <input type="text" className="form-control" id="username" value={name} readOnly />
                          </div>
                      </div>
  
                      <div className="col-6">
                          <div className="mb-3">
                              <label htmlFor="email" className="form-label">Email</label>
                              <input type="email" className="form-control" id="email" value={email} readOnly />
                          </div>
                      </div>
  
                      <div className="col-6">
                          <div className="mb-3">
                              <label htmlFor="phone" className="form-label">Phone</label>
                              <input type="tel" className="form-control" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                          </div>
                      </div>
                  </div>
                  <div className="mb-3">
                      <button className="btn btn-success" onClick={handleUpdateClick}>Update</button>
                  </div>
              </div>
          </div>
    )
  }

export default Profile
