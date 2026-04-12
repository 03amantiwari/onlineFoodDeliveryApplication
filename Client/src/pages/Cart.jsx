import React, { useState } from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { decrementQtyAction,incrementQtyAction } from '../slices/CartSlice'
import { config } from '../services/config'


function Cart() {
    const cart = useSelector(store => store.cartReducer.cart)
    const [qty ,setQty] = useState(0)
    const [totalBill, setTotalBill] = useState(0)

    const dispatch = useDispatch()



  return (
    <div className='row m-3'>
      <div className='col-8'>
        <h2>Cart</h2>
        {
            cart.map(c => {
                return <div className='row m-3'>
                    <div className='col-2'>
                        <img src={config.BASE_URL_IMAGE + c.image} alt="" style={{width:180,height:120}} />
                    </div>
                    <div className='col-9 ms-3'>
                        <h4>{c.name}</h4>
                        <h4>Rs. {c.price}</h4>
                        <div>
                            <button style={{width: 30}} onClick={() => {dispatch(incrementQtyAction(c.fid))}}>+</button>
                            <label htmlFor="" className='ms-2 me-2' style={{fontSize:20}}>{c.qty}</label>
                            <button style={{width: 30}} onClick={() => {dispatch(decrementQtyAction(c.fid))}}>-</button>
                        </div>
                    </div>
                </div>
            })
        }

      </div>
      <div className='col-4'>
        <h2>Summary</h2>
      </div>
    </div>
  )
}

export default Cart
