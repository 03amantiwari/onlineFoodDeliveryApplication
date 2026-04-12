import { Routes,Route } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import { createContext, useState } from "react"
import { ToastContainer } from "react-toastify"
import ProtectedRoute from "./components/ProtectedRoute"
import Food from './pages/Food'
import Profile from "./pages/Profile"

export const authContext = createContext()





function App() {
  const [user,setUser] = useState(null)
  return (
    <authContext.Provider value={{user,setUser}}>
      <Routes>
      <Route path="/*" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/home" element={<ProtectedRoute> <Home/> </ProtectedRoute>}>
        <Route path="" element={<Food/>} />
        <Route path="orders" element={<Orders/>} />
        <Route path="cart" element={<Cart/>} /> 
        <Route path="profile" element={<Profile/>} /> 
      </Route>
      </Routes>
      <ToastContainer/>
    </authContext.Provider>
    
  )
}

export default App
