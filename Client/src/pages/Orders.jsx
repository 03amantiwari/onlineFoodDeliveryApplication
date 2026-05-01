import React from 'react'
import { useLocation } from 'react-router-dom'

function Orders() {

  const location = useLocation()

  // Data coming from Cart page
  const { cart, orderId } = location.state || { cart: [], orderId: null }

  const totalBill = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  )

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="text-center mb-4">
        <h2>Order Summary</h2>
        <p className="text-muted">Invoice</p>
      </div>

      {/* Order Info */}
      <div className="mb-3">
        <h5>Order ID: #{orderId || "N/A"}</h5>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">

          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item, index) => (
              <tr key={item.fid}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>₹ {item.price}</td>
                <td>₹ {item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>

          {/* Footer */}
          <tfoot>
            <tr>
              <td colSpan="4" className="text-end fw-bold">
                Total Bill
              </td>
              <td className="fw-bold">₹ {totalBill}</td>
            </tr>
          </tfoot>

        </table>
      </div>

      

    </div>
  )
}

export default Orders