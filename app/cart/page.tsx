import React from 'react'

const Cart = () =>  {
  return (
   <section   className='w-full min-h-screen  font-maven' >  

   <div  className='max-w-[90%]   mx-auto  lg:p-2'>
    <div  className='flex items-center justify-between  py-8'  >
      <h2   className='font-extrabold text-4xl '>My Cart</h2>
      <p  className='font-medium text-xl '>€ 364.97</p>
    </div>


    <div  className='w-full flex items-center justify-center gap-4 '>

      {/* card history */}
      <div  className='w-[70%] border h-[400px] '>
      </div>



     
     {/* Payement history */}
      <div  className='w-[30%] border h-[400px] '>
      </div>




    </div>




    </div> 
   </section>
  )
}
 
export default  React.memo(Cart) 
