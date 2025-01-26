import React from 'react'
import { useSelector } from 'react-redux'
const Product = () => {
  const {count}=useSelector((state)=>state.products)
  return (
    <div>
      <p>The Product quantity is: {count} </p>
    </div>
  )
}

export default Product
