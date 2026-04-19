import axios from "axios";
import { config } from "./config";


export async function placeOrder(token , orderDetails){
    const URL = config.BASE_URL +'order'
    const headers = {
        authorization : 'Bearer ' + token
    }
    try{
        const response = await axios.post(URL,orderDetails,{headers})
        console.log("Order.js --> ")
        console.log(response)
        return response.data
    }catch(error){
        window.alert(error)
    }
}