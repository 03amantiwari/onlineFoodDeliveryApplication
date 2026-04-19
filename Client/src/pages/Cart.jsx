import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrementQtyAction, incrementQtyAction } from '../slices/CartSlice'
import { config } from '../services/config'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { placeOrder } from '../services/order'

function Cart() {
  const cart = useSelector(state => state.cartReducer.cart)
  const dispatch = useDispatch()
  const [qty, setQty] = useState(0)
  const [totalBill, setTotalBill] = useState(0)

  useEffect(()=>{
    let totalqty = 0
    let total = 0
    for(let c of cart){
      totalqty += c.qty
      total += (c.price * c.qty)
    }
    setQty(totalqty)
    setTotalBill(total)
  },[cart])

  const handlePlaceOrderClick = async ()=>{
    const token = window.sessionStorage.getItem('token')
    const orderdetails = {
      total : totalBill,
      items : cart
    }
    try{
      const response = await placeOrder(token,orderdetails)
      console.log("Cart.jsx --> ")
      console.log(response)
      if(response.status == 'success'){
        toast.success('Order placed successfully..')
        // dispatch(emptyCartAction())
      }
    }catch(error){
      toast.error(error)
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        
        {/* Cart Section */}
        <div className="col-lg-8 col-md-12">

          {cart.map((c) => (
            <div key={c.fid} className="card mb-3 p-3 shadow-sm">
              <div className="row g-3 align-items-center">

                {/* Image */}
                <div className="col-md-3 col-12 text-center">
                  <img
                    src={config.BASE_URL_IMAGE + c.image}
                    alt={c.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: "120px", objectFit: "cover" }}
                  />
                </div>

                {/* Details */}
                <div className="col-md-6 col-12">
                  <h5 className="mb-1">{c.name}</h5>
                  <p className="mb-2 text-muted">Rs. {c.price}</p>

                  {/* Quantity Controls */}
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => dispatch(incrementQtyAction(c.fid))}
                    >
                      +
                    </button>

                    <span className="mx-3 fs-5">{c.qty}</span>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => dispatch(decrementQtyAction(c.fid))}
                    >
                      -
                    </button>
                  </div>
                </div>

                {/* Total per item */}
                <div className="col-md-3 col-12 text-md-end text-start">
                  <h6>Total</h6>
                  <p className="fw-bold">
                    Rs. {c.price * c.qty}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
          <div className="col-3">
                    <h2>Summary</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#Items</th>
                                <th>{cart.length}</th>
                            </tr>
                            <tr>
                                <th>#Quantity</th>
                                <th>{qty}</th>
                            </tr>
                            <tr>
                                <th>#Total</th>
                                <th>{totalBill}</th>
                            </tr>
                        </thead>
                    </table>
                    <button className="btn btn-primary col-12 mt-3" onClick={handlePlaceOrderClick} >Place Order</button>
                </div>
        </div>

      </div>
    </div>
  )
}

export default Cart