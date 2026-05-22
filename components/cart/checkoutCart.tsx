"use client"

import React from 'react'
import { Button } from '../ui/button'
import {ChevronRight} from "lucide-react"
import { PayOne,PayTwo,PayThre,PayFour,PaypalText } from '@/images/Images'
import Image from 'next/image'

const CheckOutCart = () => {
  return (
    <div  className='w-full min-h-[300px]   border  font-maven  p-3   flex flex-col gap-2'>
      <div 
      className='text-xs font-medium  mt-2'
      >By clicking "checkout" or another payment method, I agree to the 
      <span className='text-blue-700  font-semibold  underline'>Terms Of Use</span> and 
      <span  className='text-blue-700  font-semibold  underline'>Privacy Statement.</span></div>

      <Button
      className='rounded-none w-full  h-13 bg-black text-white
      text-md  cursor-pointer    hover:bg-black/70  flex items-center  gap-0'
      >
        Checkout <ChevronRight  className='w-4' />
      </Button>


      <div  className='text-center   text-gray-700 font-medium'>
        <p>OR</p>
      </div>


        <Button
      className='rounded-none w-full  h-13   bg-gray-100
      text-md  cursor-pointer flex items-center  gap-0  text-gray-700  font-medium'
      >
        <Image
        src={PaypalText}
        alt='paypalText'
        className='w-20'
        /> 
          Checkout 
      </Button>


      <div className='p-1 text-gray-700 uppercase font-semibold text-xs  mt-2'>
        <p>We also accept</p>

        <div  className='flex items-center gap-x-3 mt-2 '>
                 <Image
          src={PayFour}
          alt='pay-one'
          className='w-10'
          />

          
                <Image
          src={PayTwo}
          alt='pay-one'
          className='w-10'

          />

          
                <Image
          src={PayThre}
          alt='pay-one'
          className='w-10'

          />
          
          <Image
          src={PayOne}
          alt='pay-one'
          className='w-10'
          />



         

          
      </div>

      </div>

     
    </div>
  )
}

export default   React.memo(CheckOutCart) 
