"use client"
import React from 'react'
import product from '@/public/product1.webp'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Plus } from 'lucide-react'


const CegoryProductCard = () => {
  return (
    <div  className='w-full font-maven  flex items-center justify-center' >
        <div  className='w-[270px] hover:border  hover:border-black  min-h-[450px]  mt-10 
         cursor-pointer  hover:shadow-[0px_3px_0px_0px_#000]
        '>
            

            {/* Image div */}
            <div  className=''>
            <div  className='p-2  bg-gray-100 '>
                <Image 
                src={product}
                alt='Product-Image'
                />

                <div
                // onClick={}
                className='bg-black  w-6 h-6 rounded-full  flex items-center px-0.5
                  relative  right-0   top-0'>
                <Plus   className='text-white/80   w-5 h-5 '/>
                </div> 
            </div>
            {/* slide Images */}
            <div  className='w-full cursor-pointer min-h-4 flex items-center px-3 gap-x-2'>
                <div  className='hover:border-b-2 border-black   transition duration-500 '>
                <Image 
                className='w-10 h-10'
                src={product}
                alt='other-images'
                /> 
                </div>
            
                <div  className='hover:border-b-2 border-black  transition duration-500'>
                <Image 
                className='w-10 h-10'
                
                src={product}
                alt='other-images'
                /> 
                </div>

               <div  className='hover:border-b-2 border-black transition duration-500 '>

                <Image 
                className='w-10 h-10'
                src={product}
                alt='other-images'
                /> 
                </div>



               <div  className='hover:border-b-2 border-black  transition duration-500'>
                <Image 
                className='w-10 h-10'
                
                src={product}
                alt='other-images'
                /> 
                </div>

                <p  className='text-gray-900 text-sm  mt-1 mx-2'>+17</p>
            </div>
                </div>



            {/* Text div */}
            <div className='px-4      flex flex-col gap-1'>
                <p className='font-maven  font-medium '>New Balance 9060</p>
                <div  className='flex items-center gap-1 '>
                <Star  className='w-3 ' />
                <Star  className='w-3 ' />
                <Star  className='w-3 ' />
                <Star  className='w-3 ' />
                <p className='text-gray-900 text-sm   mx-1'>(99)</p>
                </div>


                <p  className='text-gray-500 text-xs'>Men Shoes</p>
                <p   className='text-gray-500 text-xs' >Grey - Grey - Grey</p>


               {/* Price */}
                <div  className='flex items-center gap-3'>
                    <p  className='text-gray-900 font-semibold'>€ 125.00</p>
                    <p  className='text-gray-900 font-normal line-through'>€ 159.99</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default  React.memo(CegoryProductCard) 
