import CheckOutCart from '@/components/cart/checkoutCart'
import OrderProduct from '@/components/cart/orderProduct'
import OrderSummary from '@/components/cart/orderSummary'
import React from 'react'

const Cart = () =>  {
  return (
   <section   className='w-full min-h-screen  font-maven' >  

   <div  className='max-w-[95%]   mx-auto '>
    <div  className='flex items-center justify-between mx-2 lg:mx-0  py-8'  >
      <h2   className='font-extrabold lg:text-4xl text-3xl '>My Cart</h2>
      <p  className='font-medium text-xl '>€ 364.97</p>
    </div>


    <div  className='w-full flex flex-col   lg:flex-row  justify-center lg:gap-4  '>

      {/* card history */}
      <div  className='lg:w-[67%]  w-[100%]  min-h-[400px]  flex flex-col items-center gap-4 py-2 '>
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
      </div>



     
     {/* Payement history */}
      <div  className='lg:w-[33%]    w-[100%]  min-h-[500px]  '>
     <div  className='w-full  top-10 sticky'>
        <OrderSummary />
        <CheckOutCart />
      </div>
      </div>




    </div>




    </div> 
   </section>
  )
}
 
export default  React.memo(Cart) 
