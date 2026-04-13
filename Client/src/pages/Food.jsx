import React, { useEffect, useState } from 'react'
import {config} from './../services/config'
import { getFoodMenu } from '../services/food'
import { useDispatch } from 'react-redux'
import { addCartAction } from '../slices/CartSlice'

function Food() {

  // const 


  const [foodItems,setFoodItems] = useState([])

  const dispatch = useDispatch()

  const getAllFoodItems =async ()=>{
    try{
      const response = await getFoodMenu()
      if(response.status=='success'){
        
        setFoodItems(response.data)
      }
    }
    catch(error){
      window.alert(error)
    }
  }

  const addToCart = (food) => {
   dispatch(addCartAction(food))
  }



  useEffect(()=>{
    getAllFoodItems()
  },[])
  return (
     <div className='container'>
            <div className='row'>
                {
                    foodItems.map(f => {
                        return <div className='col-3' key={f.fid}>
                            <div className='m-2'>
                                <div className="card" style={{ width: '18rem' }}>
                                    <img src={config.BASE_URL_IMAGE + f.image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{f.name}</h5>
                                        <p className="card-text" style={{ height: '8rem' }}>{f.description}</p>
                                        <h5 className="card-title">Rs. {f.price}</h5>
                                        <a href="#" className="btn btn-primary" onClick={() =>
                                          addToCart(f)
                                          }>Add To Cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div >
  )
}

export default Food
