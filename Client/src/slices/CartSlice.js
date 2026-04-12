import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[]
    },
    reducers:{
        addCartAction:(state,{payload})=>{
            const index = state.cart.findIndex(c=>c.fid==payload.fid)
            if(index != -1)
                state.cart[index].qty += 1
            else
                state.cart.push({...payload,qty:1})
        },
        incrementQtyAction:(state,{payload})=>{
            const index = state.cart.findIndex(c=>c.fid == payload)
            state.cart[index].qty +=1
        },
        decrementQtyAction:(state,{payload})=>{
            const index = state.cart.findIndex(c => c.fid == payload)
            if(state.cart[index].qty == 1)
                state.cart.splice(index,1)
            else
                state.cart[index].qty -= 1
        }
    }
})

export const {incrementQtyAction,decrementQtyAction,addCartAction} = CartSlice.actions
export default CartSlice