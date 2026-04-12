import axios from "axios";
import { config } from "./config";


export async function getFoodMenu(){
    const url = config.BASE_URL + 'food/menu'
    try{
        const response = await axios.get(url)
        return response.data
    }
    catch(error){
        window.alert(error)
    }
}