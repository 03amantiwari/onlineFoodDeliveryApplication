import axios from 'axios'
import { config } from './config'


export async function loginUser(email,password){
    const url = config.BASE_URL +'user/signin'
    const body ={email,password}
    try{
        const response = await axios.post(url,body)
        return response.data
    }
    catch(error){
        window.alert(error)
    }
}

export async function registerUser(name,email,password,phone){
    const url = config.BASE_URL + 'user/signup'
    const body = {name,email,password,phone}
    try{
        const response = await axios.post(url,body)
        return response.data
    }
    catch(error)
    {
        window.alert(error)
    }
}

export async function getUser (token){
    const url = config.BASE_URL+'user'
    const headers = {
        authorization:'Bearer '+ token
    }
    try{
        const response = await axios.get(url,{headers})
        return response.data
    }
    catch(error){
        window.alert(error)
    }
}

export async function updateUser(phone,token){
    const url = config.BASE_URL+'user'
    const body = {phone}
    const headers = {
        authorization:'Bearer '+token
    }
    try {
        const response = await axios.put(url,body,{headers})
        return response.data
   } catch (error) {
        window.alert(error)
    }
}