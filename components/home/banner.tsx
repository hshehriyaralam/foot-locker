import React from 'react'
import { bannerImage } from '@/images/Images'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import ShopNowBtn from '../common/button'


const Banner = () => {
  return (
    <div
    className='w-full  relative '>
        <div  className='relative  z-40  '>
        <Image
        className='w-full h-full'
        src={bannerImage}
        alt='banner'
        />  
        </div>


        <div  className='hidden lg:block absolute lg:bottom-60  lg:left-10 z-50'>
            <h2  className='text-[30px]  lg:text-[46px]   font-extrabold  leading-[1] transition-all duration-300  max-w-[400px]  font-mono uppercase text-white'>CONVERSE SHAI</h2>
            <div  className='flex items-center gap-2  mt-2'>
              <ShopNowBtn />

                 <div>
                <button
                  className=" group relative overflow-hidden uppercase text-[14px] font-medium font-mono
                    w-30 lg:w-38 h-8 flex items-center justify-center gap-2   cursor-pointer
                    text-black transition-colors duration-300  bg-gray-200   ">
                  <span
                    className=" absolute inset-0 bg-black translate-y-full group-hover:translate-y-0
                      transition-transform duration-300 ease-out"/>

                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    FIND OUT MORE
                  </span>

                  <ArrowRight
                    className=" relative z-10 w-5  text-black group-hover:text-white transition-colors duration-300"
                  />
                </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Banner
