"use client"

import React from 'react'
import { Button } from '../ui/button'

const OrderSummary = ({totalQuantity, totalPrice}:{totalQuantity:number,totalPrice:number }) => {
  return (
    <div  className='max-w-full min-h-[300px]   border  font-maven  ' >
        <div  className='bg-gray-100 text-black  text-2xl font-semibold p-4 border-b border-gray-400'>
            <h2>Order summary</h2>
        </div>
        <div className='w-full p-4  bg-white text-[17px]'>
            <div className='flex items-center justify-between  m-2  '>
                <p>Subtotal   <span  className='p-1 bg-gray-100  mx-2 ' >{totalQuantity} items</span></p>
                <p>£{totalPrice}</p>
            </div>
            <div  className='mx-2 my-4 '>
            <div className='flex items-center justify-between '>
                <p>Shipping</p>
                <p>Free</p>
            </div>
            <p  className='text-xs text-[#C300C3]  font-semibold'>Free standard shipping & returns for FLX Members</p>
            </div>
            <div className='flex items-center justify-between m-3 mt-3 '>
                <p>Promo code</p>
                <Button  className='bg-white px-2  border border-black text-black rounded-none  cursor-pointer  text-md font-normal'>
                    + Apply
                </Button>
            </div>
            <div className='flex items-center justify-between m-3  font-semibold '>
                <p>Estimated total</p>
                <p>£{totalPrice}</p>
            </div>
            <p   className='m-3'>VAT included</p>
        </div>
    </div>
  )
}

export default  React.memo(OrderSummary) 
