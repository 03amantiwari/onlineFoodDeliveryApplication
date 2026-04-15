import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrementQtyAction, incrementQtyAction } from '../slices/CartSlice'
import { config } from '../services/config'

function Cart() {
  const cart = useSelector(state => state.cartReducer.cart)
  const dispatch = useDispatch()

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
          <div className="card p-3 shadow-sm">
            <h3>Summary</h3>

            <hr />

            <h5>
              Total Bill: Rs.{" "}
              {cart.reduce((total, item) => total + item.price * item.qty, 0)}
            </h5>

            <button className="btn btn-primary mt-3 w-100">
              Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart