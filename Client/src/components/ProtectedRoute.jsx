
import React ,{ useContext } from 'react'
import { authContext } from '../App'
import {Navigate} from 'react-router'

function ProtectedRoute({children}) {
  const {user} = useContext(authContext)
  return user ? children:<Navigate to="/" />
}
export default ProtectedRoute
