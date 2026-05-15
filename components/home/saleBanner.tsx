import { ArrowRight } from 'lucide-react'
import React from 'react'

const SaleBanner = () => {
  return (
    <section  className='w-full mx-auto  px-4 py-8 lg:px-10'>
      <div className='max-w-full bg-[#F3682D] py-10 my-4  
      flex  lg:flex-row flex-col lg:items-center justify-between   gap-6   lg:gap-0  border lg:px-10
      px-4'>
    
        <div  className='font-semibold font-maven text-white    '>
            <h2 className=' text-[24px] lg:text-[30px]   mb-1  leading-[1.2]  '>   10% OFF FIRST APP ORDER WITH CODE: FL10</h2>
            <p  className='text-white  lg:text-[16px]  text-[14px] '>First order only. Exclusive apply.</p>
        </div>

            <div>
               <button
              className='bg-gray-200/90 hover:bg-black    text-black hover:text-white  
               uppercase text-[14px]   transition duration-300   cursor-pointer font-medium  font-mono
               lg:w-26   w-30  flex  items-center  justify-center gap-2  group relative'>
                SHOP NOW 
                <ArrowRight  className='text-black group-hover:text-white w-5  ' />
              </button>
          </div>
    </div>
    </section>

  )
}

  export default  React.memo(SaleBanner) 
