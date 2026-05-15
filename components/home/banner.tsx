import React from 'react'
import { bannerImage } from '@/images/homeImages'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'


const Banner = () => {
  return (
    <div
    className='w-full mx-auto relative my-4 '>
        <div  className='relative  z-40'>
        <Image
        className=''
        src={bannerImage}
        alt='banner'
        />  
        </div>


        <div  className='hidden lg:block absolute lg:bottom-60  lg:left-10 z-50'>
            <h2  className='text-[30px]  lg:text-[46px]   font-extrabold  leading-[1] transition-all duration-300  max-w-[400px]  font-mono uppercase text-white'>CONVERSE SHAI</h2>

            {/* buttons */}
            <div  className='flex items-center gap-2  mt-2'>
                  <button
              className='bg-gray-200/90 hover:bg-black    text-black hover:text-white  
               uppercase text-[14px]   transition duration-300   cursor-pointer font-medium  font-mono
               lg:w-26   w-30  flex  items-center  justify-center gap-2  group relative'>
                SHOP NOW 
                <ArrowRight  className='text-black group-hover:text-white w-5  ' />
              </button>


                <button
              className='bg-gray-200/90 hover:bg-black    text-black hover:text-white  
               uppercase text-[14px]   transition duration-300   cursor-pointer font-medium  font-mono
               lg:w-40   w-30  flex  items-center  justify-center gap-2  group relative  uppercase'>
                FIND OUT MORE
                <ArrowRight  className='text-black group-hover:text-white w-5  ' />
              </button>
            </div>
        </div>
    </div>
  )
}

export default Banner
