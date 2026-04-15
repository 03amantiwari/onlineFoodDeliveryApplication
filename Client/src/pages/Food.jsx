import React, { useEffect, useState } from 'react'
import { config } from './../services/config'
import { getFoodMenu } from '../services/food'
import { useDispatch } from 'react-redux'
import { addCartAction } from '../slices/CartSlice'

function Food() {

  const [foodItems, setFoodItems] = useState([])
  const dispatch = useDispatch()

  const getAllFoodItems = async () => {
    try {
      const response = await getFoodMenu()
      if (response.status === 'success') {
        setFoodItems(response.data)
      }
    } catch (error) {
      window.alert(error)
    }
  }

  const addToCart = (food) => {
    dispatch(addCartAction(food))
  }

  useEffect(() => {
    getAllFoodItems()
  }, [])

  return (
    <div className="container mt-4">
      <div className="row g-4">

        {foodItems.map((f) => (
          <div key={f.fid} className="col-lg-3 col-md-4 col-sm-6 col-12">

            <div className="card h-100 shadow-sm">

              {/* Image */}
              <img
                src={config.BASE_URL_IMAGE + f.image}
                className="card-img-top"
                alt={f.name}
                style={{
                  height: "180px",
                  objectFit: "cover"
                }}
              />

              {/* Body */}
              <div className="card-body d-flex flex-column">

                <h5 className="card-title">{f.name}</h5>

                {/* Description */}
                <p
                  className="card-text text-muted"
                  style={{
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {f.description}
                </p>

                <h6 className="fw-bold mb-2">Rs. {f.price}</h6>

                {/* Button */}
                <button
                  className="btn btn-primary w-100"
                  onClick={() => addToCart(f)}
                >
                  Add To Cart
                </button>

              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default Food